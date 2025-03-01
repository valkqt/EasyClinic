using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Models;

namespace Core.Interfaces.Services
{
    public interface IExaminationService
    {
        public Task<IEnumerable<Examination>> GetExaminationsAsync();
        public Task<int> CreateExaminationAsync(Examination exam);
        public Task UpdateExaminationAsync(Examination exam);
    }
}
