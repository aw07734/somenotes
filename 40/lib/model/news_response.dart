import 'package:json_annotation/json_annotation.dart';

part 'news_response.g.dart';

@JsonSerializable(nullable: false)
class NewsResponse {
  String message;
  List<NewsDataItem> data;

  NewsResponse();

  factory NewsResponse.fromJson(Map<String, dynamic> json) => _$NewsResponseFromJson(json);

  Map<String, dynamic> toJson() => _$NewsResponseToJson(this);
}

@JsonSerializable(nullable: false)
class NewsDataItem {
  String content;

  NewsDataItem();

  factory NewsDataItem.fromJson(Map<String, dynamic> json) => _$NewsDataItemFromJson(json);

  Map<String, dynamic> toJson() => _$NewsDataItemToJson(this);
}

@JsonSerializable()
class NewsDataContent {
  @JsonKey(defaultValue: "")
  String abstract;
  @JsonKey(defaultValue: "")
  String url;
  @JsonKey(defaultValue: "")
  String title;
  @JsonKey(defaultValue: "")
  String stick_label;
  @JsonKey(defaultValue: "")
  String source;
  @JsonKey(defaultValue: "")
  int comment_count;
  @JsonKey(defaultValue: [])
  List<NewsDataImage> image_list;
  @JsonKey(defaultValue: "")
  int article_type;

  NewsDataContent();

  factory NewsDataContent.fromJson(Map<String, dynamic> json) => _$NewsDataContentFromJson(json);

  Map<String, dynamic> toJson() => _$NewsDataContentToJson(this);
}

@JsonSerializable()
class NewsDataImage {
  String url;

  NewsDataImage({required this.url});

  factory NewsDataImage.fromJson(Map<String, dynamic> json) => _$NewsDataImageFromJson(json);

  Map<String, dynamic> toJson() => _$NewsDataImageToJson(this);
}
