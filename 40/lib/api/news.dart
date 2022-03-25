import 'dart:convert';
import 'dart:math';
import 'package:dio/dio.dart';
import '../model/news_response.dart';

Dio dio = Dio();

Future<List<NewsDataContent>> fetchNews(String channel) async {
  double startDouble = Random().nextDouble() * 10;
  int pageStart = startDouble.floor() * 10;
  Response res = await dio.get("http://is.snssdk.com/api/news/feed/v51/?category=${channel}&start=${pageStart}&end=${pageStart + 10}");
  NewsResponse data = NewsResponse.fromJson(res.data);
  return data.data.map((item) {
    return NewsDataContent.fromJson(jsonDecode(item.content));
  }).toList();
}
