import 'dart:math';

import 'package:flutter/material.dart';
import 'package:flutterdemo2/api/news.dart';

import '../../components/Home/ListItem.dart';
import '../../model/news_response.dart';

class Home extends StatefulWidget {
  const Home({Key? key}) : super(key: key);

  @override
  State<StatefulWidget> createState() => _HomeState();
}

class _HomeState extends State<Home> with SingleTickerProviderStateMixin {
  late TabController mController;
  List<String> tabTitles = ["推荐", "实时", " 乡村", "热点", "视频", "电影", "财经"];

  List<NewsDataContent> news_list = [];

  _HomeState();

  rem(int originWidth) {
    double deviceWidth = MediaQuery.of(context).size.width;
    return deviceWidth * originWidth / 375;
  }

  @override
  void initState() {
    super.initState();
    mController = TabController(
      length: tabTitles.length,
      vsync: this,
    );
  }

  @override
  void dispose() {
    super.dispose();
  }

  void _getInfo() async {
    double categoryDouble = Random().nextDouble() * 10;
    int channel = categoryDouble.floor();
    List<NewsDataContent> infoList = await fetchNews("$channel");

    infoList.forEach((element) {
      double type = Random().nextDouble() * 4;
      element.article_type = type.floor();
    });

    setState(() {
      news_list = infoList;
    });
  }

  @override
  Widget build(BuildContext context) {
    return FractionallySizedBox(
      widthFactor: 1,
      heightFactor: 1,
      child: Column(
        children: <Widget>[
          Container(
            child: _tabBar(),
            height: rem(30),
          ),
          Expanded(
            child: _tabBarView(),
          )
        ],
      ),
    );
  }

  Widget _tabBar() {
    return TabBar(
      indicatorSize: TabBarIndicatorSize.label,
      indicatorColor: Colors.red,
      isScrollable: true,
      controller: mController,
      labelStyle: TextStyle(
        fontSize: rem(15),
        fontWeight: FontWeight.bold,
      ),
      unselectedLabelColor: Colors.black54,
      labelPadding: EdgeInsets.fromLTRB(rem(20), 0, rem(20), 0),
      tabs: tabTitles.map((item) {
        return Tab(
          text: item,
        );
      }).toList(),
      onTap: (int e) {
        _getInfo();
      },
    );
  }

  Widget _tabBarView() {
    return TabBarView(
      controller: mController,
        children: tabTitles.map((item) {
          return Container(
            child: RefreshIndicator(
              child: ListView(
                padding: EdgeInsets.all(0),
                children: news_list.map((e) => ListItem(info: e)).toList(),
              ),
              onRefresh: () async {
                _getInfo();
              },
            ),
          );
        }).toList(),
    );
  }
}
