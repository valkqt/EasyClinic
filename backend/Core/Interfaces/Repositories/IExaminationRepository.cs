using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Models;

namespace Core.Interfaces
{
    public interface IExaminationRepository
    {
        public Task<IEnumerable<Examination>> ListAsync();
        public Task<int> CreateAsync(Examination exam);
        public Task UpdateAsync(Examination exam);
    }
}
