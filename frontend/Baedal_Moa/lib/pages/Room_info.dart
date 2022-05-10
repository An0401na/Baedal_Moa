import 'package:sample/model/Room.dart';
import 'package:flutter/material.dart';

class Room_info extends StatelessWidget {
  late final Room room;

  Room_info({required this.room});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(room.roomName),
      ),
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: Text(room.roomInfo),
      ),
    );
  }
}
