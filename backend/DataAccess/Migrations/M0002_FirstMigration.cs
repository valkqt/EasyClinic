﻿using FluentMigrator;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Migrations
{
    [Migration(2)]
    public class M0002_FirstMigration : Migration
    {
        public override void Up()
        {
            Create.Table("Patients")
                .WithColumn("Id").AsInt32().PrimaryKey().Identity()
                .WithColumn("FirstName").AsString(255).NotNullable()
                .WithColumn("LastName").AsInt32().NotNullable()
                .WithColumn("Gender").AsInt32().NotNullable()
                .WithColumn("FiscalCode").AsString(16).NotNullable()
                .WithColumn("DateOfBirth").AsDateTime2().NotNullable()
                .WithColumn("CreatedAt").AsDateTime2().NotNullable();

        }

        public override void Down()
        {
            Delete.Table("Patients");
        }

    }
}
