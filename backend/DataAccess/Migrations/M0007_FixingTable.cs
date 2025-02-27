using FluentMigrator;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Migrations
{
    [Migration(7)]
    public class M0007_FixingTable : Migration
    {
        public override void Up()
        {
            Create.Column("LastName").OnTable("Patients").AsString(255).NotNullable();
        }

        public override void Down()
        {
            Delete.Column("LastName").FromTable("Patients");
        }

    }
}
