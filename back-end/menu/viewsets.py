#menu/viewsets.py

from rest_framework import viewsets
from .models import Menu, MenuItems, Orders, OrderItems, BBUser
from .serializers import MenuSerializer, \
    MenuItemsSerializer, OrdersSerializer, OrderItemsSerializer, BBUserSerializer


class MenuViewSet(viewsets.ModelViewSet):
    serializer_class = MenuSerializer

    def get_queryset(self):
        return Menu.objects.all()


class BBUserViewSet(viewsets.ModelViewSet):
    serializer_class = BBUserSerializer

    def get_queryset(self):
        return BBUser.objects.all()


class MenuItemsViewSet(viewsets.ModelViewSet):
    serializer_class = MenuItemsSerializer

    def get_queryset(self):
        return MenuItems.objects.all()


class OrdersViewSet(viewsets.ModelViewSet):
    serializer_class = OrdersSerializer

    def get_queryset(self):
        return Orders.objects.all()


class OrderItemsViewSet(viewsets.ModelViewSet):
    serializer_class = OrderItemsSerializer

    def get_queryset(self):
        return OrderItems.objects.all()


class MenuItemsViewSet(viewsets.ModelViewSet):
    serializer_class = MenuItemsSerializer

    def get_queryset(self):
        return MenuItems.objects.all()


