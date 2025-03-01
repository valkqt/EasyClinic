using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace DataAccess.Contexts
{
    public class EasyClinicContext
    {
        private readonly IConfiguration _configuration;

        public EasyClinicContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public IDbConnection Connect() =>
            new SqlConnection(_configuration.GetConnectionString("EasyClinicConn"));
    }
}
