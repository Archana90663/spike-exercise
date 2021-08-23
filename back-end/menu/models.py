# menu/models.py
#testing push
from django.db import models


class BBUser(models.Model):
    Admin = 'Admin'
    Staff = 'Staff'
    Customer = 'Customer'
    ROLE_CHOICES = (
        (Admin, 'Admin'),
        (Staff, 'Staff'),
        (Customer, 'Customer')
    )

    type_id = models.TextField(choices=ROLE_CHOICES)
    username = models.CharField(max_length=255, default='foo', unique=True)
    password = models.CharField(max_length=255, default='foo')
    phone_number = models.CharField(max_length=255, default='foo')
    address = models.CharField(max_length=255, default='foo')
    payment_info = models.CharField(max_length=255, default='foo')

    def __str__(self):
        return self.username


class Menu(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(decimal_places=2, max_digits=5)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class MenuItems(models.Model):
    #id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(decimal_places=2, max_digits=5)
    availability = models.BooleanField()

    def __str__(self):
        return self.name


class Orders(models.Model):
    order_num = models.IntegerField(primary_key=True)
    pickup = models.CharField(max_length=255)
    car = models.CharField(max_length=255)
    #complete = models.BooleanField
    bbuser = models.ForeignKey(BBUser, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.order_num)


class OrderItems(models.Model):
    #id = models.IntegerField(primary_key=True)
    order_id = models.ForeignKey(Orders, on_delete=models.CASCADE)
    menu_items_id = models.ForeignKey(MenuItems, on_delete=models.CASCADE)
    quantity = models.IntegerField()

    def __str__(self):
        return self.menu_items_id.name