import '../model/Res.dart';
import 'package:sample/model/Res.dart';
import 'package:flutter/material.dart';

class Restaurant_info extends StatelessWidget {
  late final Res res;

  Restaurant_info({required this.res});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(res.resName),
      ),
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: Text(res.resInformation),
      ),
    );
  }
}
