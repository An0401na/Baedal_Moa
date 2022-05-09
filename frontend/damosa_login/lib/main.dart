import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:kakao_flutter_sdk/all.dart';
import 'KakaoLoginPage.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setEnabledSystemUIOverlays(
      [SystemUiOverlay.bottom, SystemUiOverlay.top]);
  KakaoContext.clientId = "f1985bfa359387851bee7bd8bf025b8b";
  runApp(DamosaLoginApp());
}

class Splash extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold();
  }
}

class DamosaLoginApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: Future.delayed(Duration(seconds: 3)),
      builder: (context, AsyncSnapshot snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return MaterialApp(home: Splash());
        } else {
          return MaterialApp(
            title: 'Damosa Login App',
            theme: ThemeData(
              primarySwatch: Colors.blue,
            ),
            home: KakaoLoginPage(),
          );
        }
      },
    );
  }
}