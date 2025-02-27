using FluentMigrator;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Migrations
{
    [Migration(6)]
    public class M0006_MoreGenderMemes : Migration
    {
        public override void Up()
        {
            Create.Column("Gender").OnTable("Patients").AsString(255).NotNullable();
        }

        public override void Down()
        {
            Delete.Column("Gender").FromTable("Patients");
        }

    }
}
