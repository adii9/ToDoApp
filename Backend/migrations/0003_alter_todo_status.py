# Generated by Django 4.1.6 on 2023-02-07 06:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Backend', '0002_todo_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todo',
            name='status',
            field=models.CharField(default='', max_length=30),
        ),
    ]
