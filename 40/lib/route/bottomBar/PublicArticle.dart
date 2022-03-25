import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class PublicArticle extends StatefulWidget {
  const PublicArticle({Key? key}) : super(key: key);

  @override
  State<StatefulWidget> createState() => _PublicArticleState();
}

class _PublicArticleState extends State<PublicArticle> {
  _PublicArticleState();

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
    return Column(
      children: <Widget>[
        Container(
          padding: EdgeInsets.only(
            left: rem(10),
            top: rem(10),
            right: rem(10),
            bottom: rem(10),
          ),
          decoration: BoxDecoration(
            border: BorderDirectional(
              bottom: BorderSide(
                width: 0.5,
                color: Colors.black26,
              ),
            ),
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: <Widget>[
              Text(
                "取消",
                style:
                    TextStyle(fontSize: rem(16), fontWeight: FontWeight.w500),
              ),
              Text(
                "写文章",
                style:
                    TextStyle(fontSize: rem(16), fontWeight: FontWeight.w700),
              ),
              Text(
                "发布",
                style:
                    TextStyle(fontSize: rem(16), fontWeight: FontWeight.w500),
              )
            ],
          ),
        ),
        Container(
          margin: EdgeInsets.only(top: rem(5)),
          padding: EdgeInsets.only(left: rem(10), right: rem(10)),
          child: ConstrainedBox(
            constraints: BoxConstraints(maxHeight: rem(50)),
            child: TextField(
              cursorWidth: 1.0,
              cursorColor: Colors.black54,
              style: TextStyle(fontSize: rem(22)),
              decoration: InputDecoration(
                filled: false,
                hintText: "请输入标题(5-30个字)",
                contentPadding: EdgeInsets.all(0),
                enabledBorder: UnderlineInputBorder(
                  borderSide: BorderSide(width: 0.5, color: Colors.grey),
                ),
                focusedBorder: UnderlineInputBorder(
                  borderSide: BorderSide(width: 0.5, color: Colors.grey),
                ),
              ),
            ),
          ),
        ),
        Expanded(
          child: Padding(
            padding: EdgeInsets.only(
              left: rem(10),
              right: rem(10),
              bottom: rem(10),
            ),
            child: TextField(
              maxLines: 25,
              cursorWidth: 1.0,
              decoration: InputDecoration(
                hintText: "开始编辑内容",
                contentPadding: EdgeInsets.only(left: 0, top: rem(10)),
                enabledBorder: UnderlineInputBorder(
                  borderSide: BorderSide.none,
                ),
                focusedBorder: UnderlineInputBorder(
                  borderSide: BorderSide.none,
                ),
              ),
            ),
          ),
        )
      ],
    );
  }
}
