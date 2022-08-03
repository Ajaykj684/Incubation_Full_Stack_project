# Generated by Django 4.0.6 on 2022-08-03 09:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='userdetails',
            name='Approved',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='userdetails',
            name='Denied',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='userdetails',
            name='applied',
            field=models.BooleanField(default=False),
        ),
    ]
