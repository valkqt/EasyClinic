using System;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;

namespace DataAccess.Contexts
{
    public class EasyClinicContext
    {
        private readonly IConfiguration _configuration;

        public EasyClinicContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public IDbConnection Connect() => new SqlConnection(_configuration.GetConnectionString("EasyClinicConn"));
    }
}
