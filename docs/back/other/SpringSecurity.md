### 安全性框架

Apache Shiro

> 比较简单易用,不依赖Spring
>
> **应用场景**: 传统的SSM项目

Spring Security

> 比较复杂,功能较强大,属于Spring框架技术
>
> **应用场景**: Springboot + Springcloud



JWT + SpringSecurity组合,多用于微服务分布式开发中.

JWT + SpringSecurity + SpringCloud

JWT + SpringSecurity + SpringCloud + 前端(AngularJS,VueJS)

### 了解SpringSecurity核心组件

SecurityContext

> SpringSecurity的上下文,保存重要对象的信息,比如,用户信息

SecurityContextHolder

> 通过该工具获取SecurityContext

Authentication

> "认证"的意思,理解成认证的主体,获取认证的信息,账号和密码

<font color=red>UserDetails</font>

> 接口
>
> 表示"用户的详情信息",规范了用户的详情信息

<font color=red>UserDetailsService</font>

> 接口
>
> 仅定义了一个方法:	loadUserByUsername(String username)

### 入门测试

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
```

SysUser

```java
@Data
public class SysUser implements UserDetails {
    private String id;
    private String username;
    private String password;
    private String locked;
    
    @Override //返回用户的权限信息
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }
    
    @Override //判断账号是否过期
    public boolean isAccountNonExpired() {
        return true;
    }
    
    @Override //判断账号是否被锁定
    public boolean isAccountNonLocked() {
        return this.locked.equals("0");
    }
    
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
    
    @Override //判断用户是否被禁用
    public boolean isEnableed() {
        return true;
    }
}
```

SysUserService

```java
@Service
public class SysUserService implements UserDetailsService {
    @Autowired
    private SysUserMapper userMapper;
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("用户名:" + username); //日志输出
        SysUserExample example = new SysUserExample();
        SysUserExample.Criteria criteria = example.createCriteria();
        
        criteria.andUsercodeEqualTo(username);
        
        List<SysUser> list = userMapper.selectByExample(example);
        
        if (list.size() == 0) {
            throw new UsernameNotFoundException("账号不存在");
        }
        return list.get(0);
    }
}
```

SecurityConfig

```java
@Configuration
public class SecurityConfig extends WebSecurityConfigApapter {
    @Autowired
    private SysUserService userService;
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); //指定加密算法,在springsecurity中密码必须要加密
    }
    
    @Override
    protected void configure(AuthenticationManagerBuilder anth) throws Exception {
        auth.userDetailsService(userService).passwordEncoder(passwordEncoder());
    }
    
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
            .anyRequest().authenticated()
            .and()
            .formLogin()
            .usernameParameter("username")
            .passwordParameter("password")
            .loginProcessingUrl("/doLogin")
            //.loginPage("/login") //指定登录页,不设置框架提供测试页
            .successHandler(new AuthenticationSuccessHandler() {
                @Override
                public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
                    response.setContentType("application/json;charset=UTF-8");
                    
                    PrintWriter out = response.getWriter();
                    
                    //获取用户对象的信息
                    SysUser user = (SysUser)authentication.getPrincipal();
                    ResponseData<SysUser> ret = new ResponseData(200, "登陆成功", user);
                    
                    //java对象 --> json字符串
                    String json = new ObjectMapper().writeValueAsString(ret);
                    System.out.pringln(json);
                    out.write(json);
                    out.flush();
                    out.close();
                }
            })
            .failureHandler(new AuthenticationFailureHandler() {
                @Override
                public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
                    
                }
            })
            .permitAll()
            .and()
            .logout()
            .logoutSuccessHandler(new LogoutSuccessHandler() {
                @Override
                public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
                    response.setContentType("application/json;charset=UTF-8");
                    PrintWriter out = response.getWriter();
                    
                    ResponseData ret = ResponseData.error(99999, "登陆失败");
                    //判断异常的类型
                    if (exception instanceof LockedException) {
                        ret.setMsg("账号被锁定");
                    } else if (exception instanceof CredentialsExpiredException) {
                        ret.setMsg("密码过期");
                    } else if (exception instanceof DisabledException) {
                        ret.setMsg("账号被禁用");
                    } else if (exception instanceof BadCredentialsException) {
                        ret.setMsg("账号或密码错误");
                    }
                    
                    out.write(new ObjectMapper().writeValueAsString(ret));
                    out.flush();
                    out.close();
                }
            })
            .permitAll()
            .and()
            .csrf().disable(); //屏蔽跨域攻击
    }
}
```

TestBcryptPassword

```java
@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes= {App.class})
public class TestBcryptPassword {
    @Test
    public void testBcryptPassword() {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String password = "123";
        String str = encoder.encode(password);
        
        System.out.println(str);
    }
}
```

### 如何实现无状态

无状态登录的流程

- 首先客户端发送账户名/密码到服务端进行认证
- 认证通过后,服务端将用户信息加密并且编码成一个token,返回给客户端
- 以后客户端每次发送请求,都需要携带认证的token
- 服务端对客户端发送来的token进行解密,判断是否有效,并且获取用户登录信息

```markdown
1. 应用程序或客户端向授权服务器请求授权
2. 获取到授权后,授权服务器会向应用程序返回访问令牌
3. 应用程序使用访问令牌来访问受保护资源(如API)
因为JWT签发的token中已经包含了用户的身份信息,并且每次请求都会携带,这样服务端就无需保存用户信息,甚至无需去数据库查询,这样就完全符合了RESTful的无状态规范.
```

### JWT数据格式

JWT包含三部分数据:

**Header**

> 头部,通常头部有两部分信息:
>
> - 声明类型,这里是JWT
> - 加密算法,自定义
>
> 我们会对头部进行Base64Url编码(可解码),得到第一部分数据

**Payload**

> 载荷,就是有效数据,在官方文档中(RFC7519),这里给了7个示例信息:
>
> - iss(issuer):	表示签发人
> - exp(expiration time):    表示token过期时间
> - sub(subject):    主题
> - aud(audience):    受众
> - nbf(Not Before):    生效时间
> - iat(Issued At):    签发时间
> - jti(JWT ID):    编号
>
> 这部分也会采用Base64Url编码,得到第二部分数据

**Signature**

> 签名,是整个数据的认证信息.
>
> 一般根据前两步的数据,再加上服务的密钥secret(密钥保存在服务端,不能泄露给客户端),通过Header中配置的加密算法生成.
>
> 用于验证整个数据完整和可靠性.

### JWT存在的问题

1. 续签问题,这是被很多人诟病的问题之一,传统的cookie+session的方案天然的支持续签,但是jwt由于服务端不保存用户状态,因此很难完美解决续签问题

   如果引入redis,虽然可以解决问题,但是jwt也变得不伦不类了

2. 注销问题,由于服务器端不再保存用户信息,所以一般可以通过修改secret来实现注销,服务端secret修改后,已经颁发的未过期的token就会认证失败,进而实现注销,不过毕竟没有传统的注销方便

3. 密码重置,密码重置后,原本的token依然可以访问系统,这时候也需要强制修改secret

4. 基于第2点和第3点,一般建议不同用户取不同secret

### Test

SecurityConfig

```java
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private SysUserService userService;
    
    @Bean
    @Override
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    @Bean
    @Override
    public UserDetailsService userDetailsService() {
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
                System.out.println("账号:" + username);
                SysUser user = userService.findUserByUsercode(username);
                if (user != null) {
                    Collection<? extends GrantedAuthority> authorities = new ArrayList<>();
                    return new UserDetailImpl(user, authorities);
                }
                throw new UsernameNotFoundException("账号或密码错误");
            }
        };
    }
    
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService()).passwordEncoder(passwordEncoder());
    }
    
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors()
            .and()
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS) //无状态请求
            .and()
            .authorizeRequests()
            .antMatchers("/doLogin")
            .permitAll()
            .anyRequest()
            .authenticated()
            .and()
            .addFilterBefore(new JwtAuthenticationFilter("/doLogin", authenticationManager()), UsernamePasswordAuthenticationFilter.class) //用户认证,成功和失败的回调
            .addFilterBefore(null, UsernamePasswordAuthenticationFilter.class); //资源拦截的认证
        
        http.csrf().disable();
        http.headers().cacheControl();
        
        http.exceptionHandling().accessDeniedHandler(null)
            .authenticationEntryPoint(null);
    }
}
```

JwtAuthenticationFilter

```java
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private AuthenticationManager authenticationManager;
    
    public JwtAuthenticationFilter(String url, AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
        setFilterProcessesUrl(url);
    }
    
    //用户认证
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        try {
            //获取前端Json的数据(用户名和密码)
            SysUser user = new ObjectMapper().readValue(request.getInputStream(), SysUser.class);
            System.out.println("用户名:" + user.getUsercode());
            System.out.println("密码" + user.getPassword());

            // subject.login(token)
            return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsercode(), user.getPassword(), new ArrayList<>()));
        } catch (Exception e) {
            e.printStackTrace();
            return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(null, null, new ArrayList<>()));
        }
    }
    
    //成功认证的回调方法: 主要是返回一个有效的jwt的token
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        response.setContentType("application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();
        UserDetailImpl userDetailImpl = (UserDetailImpl) authResult.getPrincipal();
        //生成token
        String token = JwtTokenUtil.createToken("gec", userDetailImpl.getUsername(), 1800L);
        System.out.println(token);

        //放在header
        response.setHeader("token", token);
        response.setCharacterEncoding("utf-8");

        out.write(new ObjectMapper().writeValueAsString(CommonResult.success(token)));
        out.flush();
        out.close();
    }
    
    //认证失败的回调方法
    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
        response.setContentType("application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();

        System.out.println("failed exception:" + failed.getMessage());

        out.write(new ObjectMapper().writeValueAsString(CommonResult.failed("登录失败")));
        out.flush();
        out.close();
    }
}
```

JwtTokenUtil

```java
import java.util.Date;
import java.util.Optional;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

public class JwtTokenUtil {

    public static final String TOKEN_HEADER = "gtboot";
    //public static final String TOKEN_PREFIX = "gtboot ";
    public static final String TOKEN_PREFIX = "Bearer ";

    /**
     * 密钥
     */
    private static final String SECRET = "jwt_secret_gtboot";
    private static final String ISS = "gtboot";

    /**
     * 过期时间是 1800 秒
     */
    private static final long EXPIRATION = 1800L;

    public static String createToken(String issuer, String subject, long expiration) {
        return createToken(issuer, subject, expiration, null);
    }

    /**
     * 创建 token
     *
     * @param issuer     签发人
     * @param subject    主体,即用户信息的JSON
     * @param expiration 有效时间(秒)
     * @param claims     自定义参数
     * @return
     * @description todo https://www.cnblogs.com/wangshouchang/p/9551748.html
     */
    public static String createToken(String issuer, String subject, long expiration, Claims claims) {
        return Jwts.builder()
                // JWT_ID：是JWT的唯一标识，根据业务需要，这个可以设置为一个不重复的值，主要用来作为一次性token,从而回避重放攻击。
//                .setId(id)
                // 签名算法以及密匙
                .signWith(SignatureAlgorithm.HS512, SECRET)
                // 自定义属性
                .setClaims(null)
                // 主题：代表这个JWT的主体，即它的所有人，这个是一个json格式的字符串，可以存放什么userid，roldid之类的，作为什么用户的唯一标志。
                .setSubject(subject)
                // 受众
//                .setAudience(loginName)
                // 签发人
                .setIssuer(Optional.ofNullable(issuer).orElse(ISS))
                // 签发时间
                .setIssuedAt(new Date())
                // 过期时间
                .setExpiration(new Date(System.currentTimeMillis() + (expiration > 0 ? expiration : EXPIRATION) * 1000))
                .compact();
    }

    /**
     * 从 token 中获取主题信息
     *
     * @param token
     * @return
     */
    public static String getProperties(String token) {
        return getTokenBody(token).getSubject();
    }


    /**
     * 校验是否过期
     *
     * @param token
     * @return
     */
    public static boolean isExpiration(String token) {
        return getTokenBody(token).getExpiration().before(new Date());
    }

    /**
     * 获得 token 的 body
     *
     * @param token
     * @return
     */
    private static Claims getTokenBody(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET)
                .parseClaimsJws(token)
                .getBody();
    }
}
```

