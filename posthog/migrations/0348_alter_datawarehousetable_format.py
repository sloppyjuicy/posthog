# Generated by Django 3.2.19 on 2023-09-11 15:22

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("posthog", "0347_add_bigquery_export_type"),
    ]

    operations = [
        migrations.AlterField(
            model_name="datawarehousetable",
            name="format",
            field=models.CharField(
                choices=[
                    ("CSV", "CSV"),
                    ("Parquet", "Parquet"),
                    ("JSONEachRow", "JSON"),
                ],
                max_length=128,
            ),
        ),
    ]
