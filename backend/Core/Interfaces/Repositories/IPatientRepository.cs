using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Models;

namespace Core.Interfaces.Repositories
{
    public interface IPatientRepository
    {
        public Task<IEnumerable<Patient>> ListAsync();
        public Task<Patient?> GetByIdAsync(int id);
        public Task CreateAsync(Patient patient);
    }
}
