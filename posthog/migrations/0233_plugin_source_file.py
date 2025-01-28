# Generated by Django 3.2.12 on 2022-05-16 11:49
import json

import django.db.models.deletion
from django.db import migrations, models

import posthog.models.utils


def migrate_plugin_source(apps, schema_editor):
    Plugin = apps.get_model("posthog", "Plugin")
    PluginSourceFile = apps.get_model("posthog", "PluginSourceFile")

    for plugin in Plugin.objects.filter(plugin_type="source"):
        if plugin.source:
            PluginSourceFile.objects.create(
                plugin=plugin,
                filename="index.ts",
                source=plugin.source,
            )
        if plugin.config_schema:
            PluginSourceFile.objects.create(
                plugin=plugin,
                filename="plugin.json",
                source=json.dumps(
                    {
                        "name": plugin.name,
                        "config": plugin.config_schema,
                    },
                    indent=4,
                ),
            )


class Migration(migrations.Migration):
    dependencies = [
        ("posthog", "0232_add_team_person_display_name_properties"),
    ]

    operations = [
        migrations.CreateModel(
            name="PluginSourceFile",
            fields=[
                (
                    "id",
                    models.UUIDField(
                        default=posthog.models.utils.UUIDT,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                    ),
                ),
                ("filename", models.CharField(max_length=200)),
                ("source", models.TextField(blank=True, null=True)),
                (
                    "plugin",
                    models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to="posthog.plugin"),
                ),
            ],
        ),
        migrations.AddConstraint(
            model_name="pluginsourcefile",
            constraint=models.UniqueConstraint(fields=("plugin_id", "filename"), name="unique_filename_for_plugin"),
        ),
        migrations.RunPython(migrate_plugin_source, migrations.RunPython.noop, elidable=True),
    ]
