import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:sample/model/Room.dart';
import 'package:sample/Services/Services_Room.dart';
import 'package:sample/pages/Restaurant_List.dart';

import 'Room_info.dart';

class Home extends StatefulWidget {
  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  late List<Room> _room = [];
  int currentPageIndex = 0;

  @override
  void initState() {
    super.initState();

    Services_Room.getRooms().then((Room1) {
      setState(() {
        _room = Room1;
      });
    });
  }

  PreferredSizeWidget appbarWidget() {
    return AppBar(
      title: TextButton.icon(
          onPressed: () {
            print("위치 설정");
          },
          icon: Icon(
            Icons.room,
            color: Colors.deepOrange,
          ),
          label: Text(
            "현재 위치",
            style: TextStyle(color: Colors.black),
          )),
      elevation: 1,
    );
  }

  Widget drawerWidget(BuildContext context) {
    return SizedBox(
      width: MediaQuery.of(context).size.width,
      child: Drawer(),
    );
  }

  Widget bodyWidget(BuildContext context) {
    return ListView.separated(
      itemCount: null == _room ? 0 : _room.length,
      itemBuilder: (context, index) {
        Room room = _room[index];
        return Container(
          child: Row(children: [
            Container(
              padding: const EdgeInsets.all(20),
              width: 300,
              child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      room.roomName.toString(),
                      overflow: TextOverflow.ellipsis,
                      style:
                          TextStyle(fontWeight: FontWeight.bold, fontSize: 20),
                    ),
                    SizedBox(height: 5),
                    Text(
                      room.roomInfo.toString(),
                      overflow: TextOverflow.ellipsis,
                      style: TextStyle(fontSize: 16),
                    ),
                    SizedBox(height: 5),
                    Text(
                      room.hostUserId.toString(),
                      style: TextStyle(fontSize: 12, color: Colors.grey),
                    ),
                    SizedBox(height: 10),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(room.roomExpireTime.toString(),
                            style: TextStyle(fontSize: 16)),
                        SizedBox(width: 30),
                        Text(room.roomOrderPrice.toString(),
                            style: TextStyle(fontSize: 16)),
                        SizedBox(width: 30),
                        Text(room.roomOrderPrice.toString(),
                            style: TextStyle(fontSize: 16)),
                      ],
                    )
                  ]),
            ),
            Container(
              padding: const EdgeInsets.all(5),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  Container(
                    height: 22,
                    child: IconButton(
                      padding: const EdgeInsets.all(0),
                      constraints: BoxConstraints(),
                      onPressed: () {
                        print("찜하기");
                      },
                      icon: Icon(
                        Icons.favorite_border,
                        color: Colors.deepOrange,
                      ),
                      iconSize: 25,
                    ),
                  ),
                  Container(
                    height: 63,
                    child: IconButton(
                        padding: const EdgeInsets.all(0),
                        constraints: BoxConstraints(),
                        onPressed: () {
                          print("위치보기");
                        },
                        icon: Icon(
                          Icons.map,
                          color: Colors.deepOrange,
                        ),
                        iconSize: 60),
                  ),
                  SizedBox(height: 5),
                  Container(
                    height: 35,
                    child: OutlinedButton(
                        onPressed: () {
                          print("참여하기");
                          Services_Room.postRoom(room.roomId.toString());
                          Navigator.push(
                              context,
                              MaterialPageRoute(
                                builder: (context) => Room_info(room: room),
                              ));
                        },
                        child: Text("참여하기",
                            style: TextStyle(
                                color: Colors.deepOrange,
                                fontWeight: FontWeight.bold))),
                  )
                ],
              ),
            )
          ]),
        );
      },
      separatorBuilder: (BuildContext _context, int index) {
        return Container(height: 1, color: Colors.deepOrange);
      },
    );
  }

  FloatingActionButton floatingActionButtonWidget() {
    return FloatingActionButton(
        child: Icon(Icons.add),
        backgroundColor: Colors.deepOrange,
        onPressed: () {
          print("방 만들기");
          Navigator.push(context,
              MaterialPageRoute(builder: (context) => Restaurant_List()));
        });
  }

  BottomNavigationBarItem bottomNavigationBarItemWidget(
      Icon iconN, String labelN) {
    return BottomNavigationBarItem(icon: iconN, label: labelN);
  }

  Widget bottomNavigationBarWidget() {
    return BottomNavigationBar(
      type: BottomNavigationBarType.fixed,
      onTap: (int index) {
        print(index);
        setState(() {
          currentPageIndex = index;
        });
      },
      currentIndex: currentPageIndex,
      iconSize: 30,
      elevation: 10,
      selectedItemColor: Colors.deepOrange,
      unselectedItemColor: Colors.grey,
      items: [
        bottomNavigationBarItemWidget(Icon(Icons.home), "홈"),
        bottomNavigationBarItemWidget(Icon(Icons.favorite), "찜 목록"),
        bottomNavigationBarItemWidget(Icon(Icons.search), "검색"),
        bottomNavigationBarItemWidget(Icon(Icons.assignment), "주문 내역"),
        bottomNavigationBarItemWidget(Icon(Icons.person), "프로필")
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: appbarWidget(),
        endDrawer: drawerWidget(context),
        body: bodyWidget(context),
        floatingActionButton: floatingActionButtonWidget(),
        bottomNavigationBar: bottomNavigationBarWidget());
  }
}
