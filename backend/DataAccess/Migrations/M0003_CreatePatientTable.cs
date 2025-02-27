using FluentMigrator;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Migrations
{
    [Migration(3)]
    public class M0003_CreatePatientTable : Migration
    {
        public override void Up()
        {
            Create.Column("Photo").OnTable("Patients").AsString(255).Nullable();
        }

        public override void Down()
        {
            Delete.Column("Photo").FromTable("Patients");
        }

    }
}
