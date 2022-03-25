import 'package:flutter/material.dart';

import '../../components/Mine/MineListItem.dart';

class Mine extends StatefulWidget {
  const Mine({Key? key}) : super(key: key);

  @override
  State<StatefulWidget> createState() => _MineState();
}

class _MineState extends State<Mine> {
  _MineState();

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
    List<Map<String, String>> arr = [
      {"name": "历史记录"},
      {"name": "我的文章"},
      {"name": "我的评论"},
      {"name": "设置"}
    ];
    return FractionallySizedBox(
      widthFactor: 1,
      heightFactor: 1,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: <Widget>[
          Container(
            margin: EdgeInsets.only(top: rem(60), bottom: rem(15)),
            width: rem(50),
            height: rem(50),
            decoration:
                const BoxDecoration(shape: BoxShape.circle, color: Colors.red),
          ),
          Container(
            margin: EdgeInsets.only(bottom: rem(30)),
            child: Text(
              "这个人比较懒, 什么都没有留下",
              style: TextStyle(
                fontSize: rem(16),
                fontWeight: FontWeight.w700,
                color: Colors.black54,
              ),
            ),
          ),
          ...arr
              .map((e) => MineListItem(
                    config: e,
                  ))
              .toList()
        ],
      ),
    );
  }
}
