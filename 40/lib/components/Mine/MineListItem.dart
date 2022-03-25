import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class MineListItem extends StatefulWidget {
  Map<dynamic, dynamic> config = {};

  MineListItem({Key? key, required this.config}) : super(key: key);

  @override
  State<StatefulWidget> createState() => _MineListItemState(config: config);
}

class _MineListItemState extends State<MineListItem> {
  Map<dynamic, dynamic> config;

  _MineListItemState({required this.config});

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
      height: rem(45),
      padding: EdgeInsets.only(left: rem(15)),
      margin: EdgeInsets.only(top: rem(5)),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: <Widget>[
          Container(
            child: Icon(Icons.add_box),
            margin: EdgeInsets.only(right: rem(10)),
          ),
          Expanded(
            flex: 1,
            child: Container(
              height: rem(45),
              padding: EdgeInsets.only(right: rem(10)),
              decoration: BoxDecoration(
                  border: BorderDirectional(bottom: BorderSide(width: 0.5))
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: <Widget>[
                  Text(config["name"]),
                  Icon(
                    Icons.arrow_forward_ios,
                    color: Colors.grey,
                    size: rem(16),
                  )
                ],
              ),
            ),
          )
        ],
      ),
    );
  }
}
