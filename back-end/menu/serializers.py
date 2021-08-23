#menu/serializers.py
from rest_framework import serializers
from .models import Menu, Orders, MenuItems, OrderItems, BBUser


class MenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Menu
        fields = ['id', 'name', 'description', 'price', 'created', 'updated']


class BBUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = BBUser
        fields = ['id', 'type_id', 'username', 'password', 'phone_number', 'address', 'payment_info']


class MenuItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItems
        fields = ['id', 'name', 'description', 'price', 'availability']


class OrdersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Orders
        #fields = ['order_num', 'pickup', 'car', 'complete', 'bbuser']
        fields = ['order_num', 'pickup', 'car', 'bbuser']


class OrderItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItems
        fields = ['id', 'order_id', 'menu_items_id', 'quantity']


