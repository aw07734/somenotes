import 'dart:async';

import 'package:flutter/material.dart';

import 'MainEntry.dart';

class App extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return const MaterialApp(home: MainEntry());
  }
}

void main() {
  // 如何在 flutter 中捕捉错误
  final isProd = const bool.fromEnvironment("dart.vm.product");

  if (isProd) {
    runZoned(() => runApp(App()), onError: (Object obj, StackTrace stack) {
      print(obj.toString());
      print(stack.toString());
    });
  } else {
    runApp(App());
  }
}
