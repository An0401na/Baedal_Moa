import 'dart:convert';

import 'package:http/http.dart' as http;
import '../Model/Res.dart';


class Services_Res {
  static const String url = 'http://203.249.22.50:8080/reslist';

  static Future<List<Res>> getRests() async {
    try {
      final response = await http.get(Uri.parse(url));
      if (200 == response.statusCode) {
        final List<Res> Res1 = resFromJson(response.body);
        print(response.body);
        return Res1;
      } else {
        print('empty');
        return <Res>[]; // 빈 사용자 목록을 반환
      }
    } catch (e) {
      return <Res>[];
    }
  }

  static Future<void> postRest(String resName) async {
    try {
      String __url = 'http://203.249.22.50:8080/noa';
      final _url = Uri.parse(__url);
      print("선택한 가게 이름 : " + resName);

      http
          .post(_url, headers: <String, String>{
        'Content-Type': 'application/x-www-form-urlencoded',
      }, body: {
        "rest_name": resName
      })
          .then((res) => print(json.decode(res.body)))
          .catchError((error) => print(error.toString()));
    } catch (error) {
      print('에러?? : ' + error.toString());
    }
  }
}