import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:kakao_flutter_sdk/all.dart';

void main() {
  KakaoContext.clientId = "5d96cb129696682031efd104fffee990";
  runApp(KakaoLogin());
}

class KakaoLogin extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Login',
      home: KakaoLoginPage(),
    );
  }
}

class KakaoLoginPage extends StatefulWidget {
  @override
  _KakaoLoginPageState createState() => _KakaoLoginPageState();
}

class _KakaoLoginPageState extends State<KakaoLoginPage> {
  Future<void> _loginButtonPressed() async {
    String authCode = await AuthCodeClient.instance.request();
    print('어스코드 출력전');
    print(authCode);
    print('어스코드 출력후');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        minimum: const EdgeInsets.symmetric(horizontal: 16),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            SizedBox(
              width: MediaQuery.of(context).size.width,
              child: CupertinoButton(
                child: Text(
                  '카카오로그인',
                  style: TextStyle(fontSize: 15, color: Colors.black),
                ),
                color: Colors.yellow,
                onPressed: _loginButtonPressed,
              ),
            ),
          ],
        ),
      ),
    );
  }
}