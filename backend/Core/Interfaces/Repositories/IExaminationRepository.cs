using Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IExaminationRepository
    {
        public Task<IEnumerable<Examination>> ListAsync();
        public Task<int> Create(Examination exam);
        public Task Update(Examination exam);

    }
}
