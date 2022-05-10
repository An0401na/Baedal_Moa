import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:kakao_flutter_sdk/all.dart';
import 'package:flutter/cupertino.dart';

class KakaoLoginPage extends StatefulWidget {
  @override
  State<KakaoLoginPage> createState() => _KakaoLoginPageState();
}

class _KakaoLoginPageState extends State<KakaoLoginPage> {
  bool _isKakaoTalkInstalled = false;

  void initState() {
    _initKakaoTalkInstalled();
    super.initState();
  }

  //카카오톡 설치 유무 확인
  Future<void> _initKakaoTalkInstalled() async {
    final installed = await isKakaoTalkInstalled();
    print('카카오 설치 : ' + installed.toString());

    setState(() {
      _isKakaoTalkInstalled = installed;
    });
  }

  //로그인 하기 누르면 auth 코드 받아옴
  Future<void> _loginButtonPressed() async {
    try {
      _isKakaoTalkInstalled ? _loginWithKakaoApp() : _loginWithWeb();
    } catch (error) {
      print(error.toString());
    }
  }

  //카카오 앱을 통한 로그인
  Future<void> _loginWithKakaoApp() async {
    try {
      print('AAuth Code');
      String authCode = await AuthCodeClient.instance.requestWithTalk();
      print('코드 : ');
      print(authCode);
      await _issueAccessToken(authCode);
    } catch (error) {
      print(error.toString());
    }
  }

  //카카오 웹을 통한 로그인
  Future<void> _loginWithWeb() async {
    try {
      print('웹을 통한 로그인');
      String authCode = await AuthCodeClient.instance.request();
      print('코드 : ');
      print(authCode);
      await _issueAccessToken(authCode);
    } catch (error) {
      print(error.toString());
    }
  }

  //autocode로 토큰 받아와서 서버로 전송
  Future<void> _issueAccessToken(String authCode) async {
    try {
      var token = await AuthApi.instance.issueAccessToken(authCode);
      var tokenManager = DefaultTokenManager();
      tokenManager.setToken(token);
      print('----------------------->');
      print(json.encode(token));
      String _accessToken = token.accessToken.toString();
      final kakaoUrl = Uri.parse('http://203.249.22.50:8080/login');
      http
          .post(kakaoUrl, headers: <String, String>{
            'Content-Type': 'application/x-www-form-urlencoded',
          }, body: {
            "access_token": _accessToken
          })
          // body: json.encode({token.accessToken}))
          .then((res) => print(json.decode(res.body)))
          .catchError((e) => print(e.toString()));
      print('token : ' + token.toString());

      // _accessTokenExist();
      _get_user_info();
    } catch (error) {
      print('에러' + error.toString());
    }
  }

  Future<void> _accessTokenExist() async {
    if (await AuthApi.instance.hasToken()) {
      try {
        User user = await UserApi.instance.me();
        print('존재함');
        _get_user_info();
      } catch (error) {
        print('엑세스 토큰 존재 안함 : ' + error.toString());
      }
    }
  }

  Future<void> _get_user_info() async {
    try {
      User user = await UserApi.instance.me();
      print(user.toString());
      print('사용자 정보 요청 성공' +
          '\n회원정보 : ${user.id}' +
          '\n닉네임 : ${user.kakaoAccount?.profile?.nickname}');
    } catch (error) {
      print('사용자 정보요청 실패' + error.toString());
    }
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
                '카카오 로그인',
                style: TextStyle(fontSize: 15, color: Colors.black),
              ),
              color: Colors.yellow,
              onPressed: _loginButtonPressed,
            ),
          )
        ],
      ),
    ));
  }
}

//https://dev-vlog200ok.tistory.com/25
//https://domdom.tistory.com/entry/flutter-%ED%94%8C%EB%9F%AC%ED%84%B0-%EC%B9%B4%EC%B9%B4%EC%98%A4-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0
//openssl => https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=dntjd207&logNo=220564518845
