using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentMigrator;

namespace DataAccess.Migrations
{
    [Migration(2)]
    public class M0002_FirstMigration : Migration
    {
        // Example migration: Creates a table
        public override void Up()
        {
            //    Create
            //        .Table("Patients")
            //        .WithColumn("Id")
            //        .AsInt32()
            //        .PrimaryKey()
            //        .Identity()
            //        .WithColumn("FirstName")
            //        .AsString(255)
            //        .NotNullable()
            //        .WithColumn("LastName")
            //        .String(255)
            //        .NotNullable()
            //        .WithColumn("Gender")
            //        .AsInt32()
            //        .NotNullable()
            //        .WithColumn("FiscalCode")
            //        .AsString(16)
            //        .NotNullable()
            //        .WithColumn("DateOfBirth")
            //        .AsDateTime2()
            //        .NotNullable()
            //        .WithColumn("CreatedAt")
            //        .AsDateTime2()
            //        .NotNullable();
            //
        }

        public override void Down()
        {
            //Delete.Table("Patients");
        }
    }
}
