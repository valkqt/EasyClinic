using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentMigrator;

namespace DataAccess.Migrations
{
    [Migration(4)]
    public class M0004_ChangePatientGender : Migration
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
