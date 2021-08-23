#./routers.py
from rest_framework import routers
from viewsets import MenuViewSet, BBUserViewSet, MenuItemsViewSet, OrdersViewSet, \
    OrderItemsViewSet

router = routers.SimpleRouter()
router.register(r'menu', MenuViewSet, basename='menu')
router.register(r'BBUser', BBUserViewSet, basename='BBUser')
router.register(r'menuitems', MenuItemsViewSet, basename='menuitems')
router.register(r'orders', OrdersViewSet, basename='orders')
router.register(r'orderitems', OrderItemsViewSet, basename='orderitems')
