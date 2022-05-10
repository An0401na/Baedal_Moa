// To parse this JSON data, do
//
//     final res = resFromJson(jsonString);

import 'dart:convert';

import 'package:flutter/cupertino.dart';

List<Res> resFromJson(String str) =>
    List<Res>.from(json.decode(str).map((x) => Res.fromJson(x)));

String resToJson(List<Res> data) =>
    json.encode(List<dynamic>.from(data.map((x) => x.toJson())));

class Res {
  Res({
    required this.resName,
    required this.resLocation,
    required this.resCategory,
    required this.resInformation,
    required this.resMinOrderPrice,
  });

  String resName;
  String resLocation;
  String resCategory;
  String resInformation;
  int resMinOrderPrice;

  factory Res.fromJson(Map<String, dynamic> json) => Res(
    resName: json["res_name"],
    resLocation: json["res_location"],
    resCategory: json["res_category"],
    resInformation: json["res_information"],
    resMinOrderPrice: json["res_min_order_price"],
  );

  Map<String, dynamic> toJson() => {
    "res_name": resName,
    "res_location": resLocation,
    "res_category": resCategory,
    "res_information": resInformation,
    "res_min_order_price": resMinOrderPrice,
  };
}