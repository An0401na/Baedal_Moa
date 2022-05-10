import 'package:flutter/material.dart';
import 'package:sample/pages/home.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
          appBarTheme: AppBarTheme(
              backgroundColor: Colors.white,
              foregroundColor: Colors.deepOrange,
              titleTextStyle: TextStyle(color: Colors.black))),
      home: Home(),
    );
  }
}
