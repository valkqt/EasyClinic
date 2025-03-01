using Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces.Services
{
    public interface IExaminationService
    {
        public Task<IEnumerable<Examination>> GetExaminations();
        public Task<int> CreateExamination(Examination exam);
        public Task UpdateExamination(Examination exam);

    }
}
