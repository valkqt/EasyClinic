using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Models;
using FluentValidation;

namespace Core.Validators
{
    public class ExaminationValidator : AbstractValidator<Examination>
    {
        public ExaminationValidator()
        {
            RuleFor(examination => examination.Motivation)
                .IsInEnum()
                .WithMessage("Please select a valid motivation.");
            RuleFor(examination => examination.Category)
                .IsInEnum()
                .WithMessage("Please select a valid category.");
            RuleFor(examination => examination.DateTime).LessThan(DateTime.Now);
        }
    }
}
