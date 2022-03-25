import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutterdemo2/model/news_response.dart';
import 'package:url_launcher/url_launcher.dart';

class ListItem extends StatefulWidget {
  final NewsDataContent info;

  const ListItem({Key? key, required this.info}) : super(key: key);

  @override
  State<StatefulWidget> createState() => _ListItemState(info: info);
}

class _ListItemState extends State<ListItem> {
  final NewsDataContent info;

  _ListItemState({required this.info});

  rem(int originWidth) {
    double deviceWidth = MediaQuery.of(context).size.width;
    return deviceWidth * originWidth / 375;
  }

  @override
  void initState() {
    super.initState();
  }

  @override
  void dispose() {
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    switch (info.article_type) {
      case 1:
        {
          return articleWithSingleImage(info); // 单图
        }
      case 2:
        {
          return articleWithImages(info); // 多图
        }
      default:
        {
          return articleWithVideo(info); // 视频
        }
    }
  }

  _launchURL() async {
    String url = info.url;
    if (await canLaunch(url)) {
      await launch(url);
    } else {
      throw "Could not launch $url";
    }
  }

  /// 视频
  Widget articleWithVideo(NewsDataContent info) {
    return InkResponse(
      onTap: () {
        _launchURL();
      },
      child: Column(
        children: <Widget>[
          FractionallySizedBox(
            widthFactor: 1,
            child: Text(
              info.title,
              textAlign: TextAlign.left,
              style: TextStyle(fontSize: rem(15)),
            ),
          ),
          Container(
            margin: EdgeInsets.only(top: rem(8)),
            child: Stack(
              children: <Widget>[
                ClipRRect(
                  borderRadius: BorderRadius.circular(rem(4)),
                  child: Image.network(
                    info.image_list.length == 0
                        ? "http://pic.sc.chinaz.com/files/pic/pic9/201607/fpic5824.jpg"
                        : info.image_list.elementAt(0).url,
                    width: rem(345),
                    height: rem(190),
                    fit: BoxFit.cover,
                  ),
                ),
                Positioned(
                  width: rem(345),
                  height: rem(190),
                  child: Center(
                    child: Container(
                      width: rem(45),
                      height: rem(45),
                      decoration: BoxDecoration(
                        color: Color.fromRGBO(0, 0, 0, 0.4),
                        shape: BoxShape.circle,
                      ),
                      child: Center(
                        child: Icon(
                          Icons.play_arrow,
                          size: rem(35),
                          color: Colors.white,
                        ),
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
          Row(
            children: <Widget>[
              Container(
                margin: EdgeInsets.only(top: rem(8), right: rem(5)),
                child: Text(
                  "开心无糖可乐站",
                  style: TextStyle(fontSize: rem(12), color: Colors.grey),
                ),
              ),
              Container(
                margin: EdgeInsets.only(top: rem(8), right: rem(5)),
                child: Text(
                  "2000浏览",
                  style: TextStyle(fontSize: rem(12), color: Colors.grey),
                ),
              ),
              Container(
                margin: EdgeInsets.only(top: rem(8), right: rem(5)),
                child: Text(
                  "99评论",
                  style: TextStyle(fontSize: rem(12), color: Colors.grey),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  /// 图文形式、单张图
  Widget articleWithSingleImage(NewsDataContent info) {
    return Container(
      padding: EdgeInsets.fromLTRB(rem(15), rem(15), rem(15), 0),
      child: Column(
        children: <Widget>[
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              Expanded(
                child: Container(
                  padding: EdgeInsets.only(right: rem(10)),
                  height: rem(80),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: <Widget>[
                      Text(
                        info.title,
                        overflow: TextOverflow.ellipsis,
                        maxLines: 2,
                        style: TextStyle(fontSize: rem(15)),
                      ),
                      Row(
                        children: <Widget>[
                          Container(),
                          Container(),
                          Container(),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
              ClipRRect(
                borderRadius: BorderRadius.circular(rem(8)),
                child: Image.network(
                  "http://pic.sc.chinaz.com/files/pic/pic9/201607/fpic5824.jpg",
                  width: rem(113),
                  height: rem(80),
                ),
              ),
            ],
          ),
          Container(
            margin: EdgeInsets.only(top: rem(10)),
            child: Divider(
              height: 1.0,
              color: Colors.black26,
            ),
          ),
        ],
      ),
    );
  }

  /// 图文形式、带多张图
  Widget articleWithImages(NewsDataContent info) {
    return Text("多图");
  }
}
