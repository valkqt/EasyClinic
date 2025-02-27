using FluentMigrator;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Migrations
{
    [Migration(5)]
    public class M0005_GenderMemes : Migration
    {
        public override void Up()
        {
            Create.Column("Gender").OnTable("Patients").AsInt32().NotNullable();
        }

        public override void Down()
        {
            Delete.Column("Gender").FromTable("Patients");
        }

    }
}
