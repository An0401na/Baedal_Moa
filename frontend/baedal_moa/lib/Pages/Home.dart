import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import '../Model/Room.dart';
import '../Model/Res.dart';
import '../Services/Services_Room.dart';
import '../Services/Services_Res.dart';
import 'Restaurant_info.dart';
import 'Room_info.dart';

class Home extends StatefulWidget {
  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  late List<Room> _room = [];
  late List<Res> _res = [];

  late Icon appBarIcon;
  int currentPageIndex = 0;
  bool isCreateRoom = false;

  @override
  void initState() {
    super.initState();

    Services_Room.getRooms().then((Room1) {
      setState(() {
        _room = Room1;
      });
    });
    Services_Res.getRests().then((Res1) {
      setState(() {
        _res = Res1;
      });
    });
  }

  PreferredSizeWidget appbarWidget() {
    return AppBar(
      title: Row(
        children: [
          IconButton(
              onPressed: () {
                if (isCreateRoom) {
                  print("방 목록으로 돌아가기");
                  setState(() {
                    isCreateRoom = false;
                  });
                } else {
                  print("위치 설정");
                }
              },
              icon: isCreateRoom
                  ? Icon(Icons.arrow_back)
                  : Icon(Icons.room, color: Colors.deepOrange)),
          Text("현재 위치", style: TextStyle(color: Colors.black))
        ],
      ),
      elevation: 1,
    );
  }

  Widget drawerWidget(BuildContext context) {
    return SizedBox(
      width: MediaQuery.of(context).size.width,
      child: Drawer(),
    );
  }

  ListView roomList(BuildContext context) {
    return ListView.separated(
      itemCount: null == _room ? 0 : _room.length,
      itemBuilder: (context, index) {
        Room room = _room[index];
        return ListTile(
          title: Row(children: [
            Container(
              padding: const EdgeInsets.all(0),
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
                    Padding(
                      padding: const EdgeInsets.only(top: 10),
                      child: Text(
                        room.hostUserId.toString(),
                        style: TextStyle(fontSize: 12, color: Colors.grey),
                      ),
                    ),
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
                ],
              ),
            )
          ]),
          subtitle: Row(
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
          ),
          onTap: () {
            print("참여하기");
            Services_Room.postRoom(room.roomId.toString());
            Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => Room_info(room: room),
                ));
          },
        );
      },
      separatorBuilder: (BuildContext _context, int index) {
        return Container(height: 1, color: Colors.deepOrange);
      },
    );
  }

  ListView resList(BuildContext context) {
    return ListView.separated(
      itemCount: null == _res ? 0 : _res.length,
      itemBuilder: (context, index) {
        Res res = _res[index];
        return ListTile(
          title: Row(children: [
            Image.asset(
              "assets/images/lotteria.jpg",
              width: 110,
              height: 110,
            ),
            Container(
              width: 190,
              padding: const EdgeInsets.only(left: 10),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    res.resName,
                    overflow: TextOverflow.ellipsis,
                    style: TextStyle(fontWeight: FontWeight.bold, fontSize: 20),
                  ),
                  Text(
                    "최소 주문 금액 : " + res.resMinOrderPrice.toString() + "원",
                    style: TextStyle(fontSize: 14, color: Colors.grey),
                  ),
                  Text(
                    "배달 요금 : " + "" + "원",
                    style: TextStyle(fontSize: 14, color: Colors.grey),
                  )
                ],
              ),
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
                ],
              ),
            )
          ]),
          onTap: () {
            Services_Res.postRest(res.resName.toString());
            Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => Restaurant_info(res: res),
                ));
          },
        );
      },
      separatorBuilder: (BuildContext context, int index) {
        return Container(height: 1, color: Colors.grey);
      },
    );
  }

  Widget bodyWidget(BuildContext context) {
    switch (currentPageIndex) {
      case 0:
        return isCreateRoom ? resList(context) : roomList(context);
      case 1:
        return Container(
            child: Text(
              "찜 목록",
            ));
      case 2:
        return Container(
            child: Text(
              "검색 화면",
            ));
      case 3:
        return Container(
            child: Text(
              "주문 내역",
            ));
      case 4:
        return Container(
            child: Text(
              "프로필 화면",
            ));
      default:
        return Container();
    }
  }

  FloatingActionButton floatingActionButtonWidget() {
    return FloatingActionButton(
        child: Icon(Icons.add),
        backgroundColor: Colors.deepOrange,
        onPressed: () {
          print("방 만들기");
          // Navigator.push(context,
          //     MaterialPageRoute(builder: (context) => Restaurant_List()));
          setState(() {
            isCreateRoom = true;
          });
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
