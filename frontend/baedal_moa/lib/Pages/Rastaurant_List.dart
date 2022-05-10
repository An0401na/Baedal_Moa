import 'package:flutter/material.dart';

import '../Model/Res.dart';
import '../Services/Services_Res.dart';
import 'Restaurant_info.dart';

class Restaurant_List extends StatefulWidget {
  Restaurant_List() : super();
  @override
  _Restaurant_ListState createState() => _Restaurant_ListState();
}

class _Restaurant_ListState extends State<Restaurant_List> {
  @override
  late List<Res> _res = [];
  late bool _loading;

  void initState() {
    super.initState();
    _loading = true;
    Services_Res.getRests().then((Res1) {
      setState(() {
        _res = Res1;
        _loading = false;
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text(_loading ? 'Loading ... ' 'Json Parsing' : '가게 목록'),
        ),
        body: Container(
          color: Colors.white,
          child: ListView.builder(
              itemCount: null == _res ? 0 : _res.length,
              itemBuilder: (context, index) {
                Res res = _res[index];
                return ListTile(
                  title: Text(res.resName),
                  subtitle:
                      Text('최소주문 금액 : ' + res.resMinOrderPrice.toString()),
                  onTap: () {
                    Services_Res.postRest(res.resName.toString());
                    Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => Restaurant_info(res: res),
                        ));
                  },
                );
              }),
        ));
  }
}
