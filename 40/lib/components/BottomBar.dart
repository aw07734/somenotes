import 'package:flutter/material.dart';

class BottomBar extends StatefulWidget {
  final changeBarPage;

  const BottomBar({Key? key, this.changeBarPage}) : super(key: key);

  @override
  State<StatefulWidget> createState() =>
      _BottomBarState(changeBarPage: changeBarPage);
}

class _BottomBarState extends State<BottomBar> {
  final changeBarPage;
  var tabList = [
    {"title": "首页", "icon": Icons.home},
    {"title": "发布", "icon": Icons.add},
    {"title": "我的", "icon": Icons.person}
  ];

  _BottomBarState({this.changeBarPage});

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
    return Container(
      width: rem(375),
      height: rem(50),
      child: Row(
        children: tabList
            .asMap()
            .keys
            .map((e) => Expanded(
                    child: InkResponse(
                  onTap: () {
                    changeBarPage(e);
                  },
                  child: FractionallySizedBox(
                    widthFactor: 1,
                    heightFactor: 1,
                    child: Container(
                        color: Colors.transparent,
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: <Widget>[
                            Icon(
                              tabList[e]["icon"] as IconData,
                              color: Color.fromRGBO(118, 118, 118, 1),
                            ),
                            Container(
                              margin: EdgeInsets.all(0),
                              child: Text(
                                tabList[e]["title"] as String,
                                style: TextStyle(
                                  color: Color.fromRGBO(118, 118, 118, 1),
                                ),
                              ),
                            )
                          ],
                        )),
                  ),
                )))
            .toList(),
      ),
    );
  }
}
