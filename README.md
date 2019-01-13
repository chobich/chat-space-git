# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|rreferences|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## userテーブル

|Column|Type|Options|
|------|----|-------|
|nickname|string|null: false|
|group_id|references|null: false, foreign_key: true|

### Association
- has_many :message
- has_many :members

## messageテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|null: true|
|image|string|null: true|
|group_id|references|null: false, foreign_key: true|
|user_id|references|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group

## groupテーブル

|Column|Type|Options|
|------|----|-------|
|groupname|string|null: false|

### Association
- has_many :message
- has_many :users
