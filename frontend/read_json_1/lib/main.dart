import 'dart:convert';
import 'dart:async';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class Post {
  final int id;

  Post({required this.id});

  factory Post.fromJson(Map<String, dynamic> json) {
    return Post(id: json['id']);
    //   return Post(id: json['id'], name: json['name']);
  }
}

Future<Post> fetchPost() async {
  final response =
      await http.get(Uri.parse('https://jsonplaceholder.typicode.com/posts/1'));
  if (response.statusCode == 200) {
    print('응답함');
    return Post.fromJson(json.decode(response.body));
  } else {
    print("응답안함");
    throw Exception('Failed to load post');
  }
}

void main() {
  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  Future<Post>? post;

  void initState() {
    super.initState();
    post = fetchPost();
    print(post);
  }

  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'ddddd',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: Scaffold(
        appBar: AppBar(
          title: Text("dd"),
        ),
        body: Center(
          child: FutureBuilder(
            future: fetchPost(),
            builder: (context, snapshot) {
              if (snapshot.hasData) {
                return buildColumn(snapshot);
              } else if (snapshot.hasError) {
                return Text("// ${snapshot.error} 에러");
              }
              return CircularProgressIndicator();
            },
          ),
        ),
      ),
    );
  }

  Widget buildColumn(snapshot) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        // Text('아이디 : ' + snapshot.data!.id.toString(),
        //     style: TextStyle(fontSize: 20)),
        Text('이름 : ' + snapshot.data!.id.toString(),
            style: TextStyle(fontSize: 20))
      ],
    );
  }
}

//참고자료 https://stackoverflow.com/questions/65630743/how-to-solve-flutter-web-api-cors-error-only-with-dart-code
