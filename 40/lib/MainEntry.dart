import 'package:flutter/material.dart';

import 'components/BottomBar.dart';
import 'route/bottomBar/Home.dart';
import 'route/bottomBar/Mine.dart';
import 'route/bottomBar/PublicArticle.dart';

class MainEntry extends StatefulWidget {
    const MainEntry({Key? key}) : super(key: key);

    @override
    State<StatefulWidget> createState() => _MainEntryState();
}

class _MainEntryState extends State<MainEntry> {
    List<Widget> bottomBarList = [Home(), PublicArticle(), Mine()];
    int currentIndex = 0;
    _MainEntryState();

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

    void changeBarPage(int idx) {
        setState(() {
          currentIndex = idx;
        });
    }

    @override
    Widget build(BuildContext context) {
        double statusBarHeight = MediaQuery.of(context).padding.top;
        return Scaffold(
            backgroundColor: Colors.white,
            body: Container(
                padding: EdgeInsets.only(top: statusBarHeight),
                child: GestureDetector(
                    child: bottomBarList.elementAt(currentIndex),
                ),
            ),
            bottomNavigationBar: BottomBar(changeBarPage: changeBarPage,),
        );
    }
}
