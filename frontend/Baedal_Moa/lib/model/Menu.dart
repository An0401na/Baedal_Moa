// To parse this JSON data, do
//
//     final menu = menuFromJson(jsonString);

import 'dart:convert';

List<Menu> menuFromJson(String str) =>
    List<Menu>.from(json.decode(str).map((x) => Menu.fromJson(x)));

String menuToJson(List<Menu> data) =>
    json.encode(List<dynamic>.from(data.map((x) => x.toJson())));

class Menu {
  Menu({
    required this.menuName,
    required this.menuPrice,
  });

  String menuName;
  int menuPrice;

  factory Menu.fromJson(Map<String, dynamic> json) => Menu(
    menuName: json["menu_name"],
    menuPrice: json["menu_price"],
  );

  Map<String, dynamic> toJson() => {
    "menu_name": menuName,
    "menu_price": menuPrice,
  };
}
