import 'package:flutter/material.dart';
import 'package:kakao_flutter_sdk/all.dart';

class login_success extends StatefulWidget {
  @override
  State<login_success> createState() => _login_successState();
}

class _login_successState extends State<login_success> {
  @override
  Widget build(BuildContext context) {
    try {
      User user = await UserApi.instance.me();
      print('사용자 정보 요청 성공'
          '\n회원번호: ${user.id}'
          '\n닉네임: ${user.kakaoAccount?.profile?.nickname}'
      );
    } catch (error) {
      print('사용자 정보 요청 실패 $error');
    }
    return Scaffold();
  }
}
