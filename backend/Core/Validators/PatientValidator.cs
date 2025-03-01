using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Models;
using FluentValidation;

namespace Core.Validators
{
    public class PatientValidator : AbstractValidator<Patient>
    {
        public PatientValidator()
        {
            RuleFor(patient => patient.FirstName).NotNull();
            RuleFor(patient => patient.LastName).NotNull();
            RuleFor(patient => patient.Gender)
                .IsInEnum()
                .WithMessage("Please select a valid Gender.");
            RuleFor(patient => patient.FiscalCode)
                .Matches(
                    "^([A-Z]{6}[0-9LMNPQRSTUV]{2}[ABCDEHLMPRST]{1}[0-9LMNPQRSTUV]{2}[A-Z]{1}[0-9LMNPQRSTUV]{3}[A-Z]{1})$|([0-9]{11})$"
                );
            RuleFor(patient => patient.DateOfBirth).LessThan(DateTime.Now);
        }
    }
}
