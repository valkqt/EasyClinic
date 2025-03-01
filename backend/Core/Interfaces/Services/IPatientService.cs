using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Models;

namespace Core.Interfaces.Services
{
    public interface IPatientService
    {
        public Task<IEnumerable<Patient>> GetPatientsAsync();
        public Task<Patient?> GetPatientByIdAsync(int id);
        public Task CreatePatientAsync(Patient patient);
    }
}
