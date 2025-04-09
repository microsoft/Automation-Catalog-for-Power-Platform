namespace ACPP.API.Constants
{
    public static class ApplicationConstants
    {
        public const string FailResponseStatus = "fail";

        public const string SuccessResponseStatus = "success";

        public const string CardsPartitionKey = "card";

        public const string CategoriesPartitionKey = "category";

        public const string UsersPartitionKey = "user";

        public const string AnnouncementPartitionKey = "announcement";

        public enum CardStatus : int { Active = 1, Inactive = 0 };
        public enum SectionStatus : int { Active = 1, Inactive = 0 };

        public static readonly string[] DefaultPrompt = new string[]
        {
                "Help me streamline my Calendar",
                "Show me automations for Email Management",
                "What's the Automation Catalog for Power Platform?",
                "Get me top 2 automations for Email",
                "What is the most popular automation? ",
                "List the categories of automation"
        };

        public const string ListAutomationIntentPrefix = "Save time and make your workday more enjoyable with these automations.";

        public const string ListCategoriesIntentPrefix = "Discover over 50 automations to save you time across the following categories";

        public static readonly Dictionary<string, string> Categories = new Dictionary<string, string>
        {
            { "Email Management", "Manage your inbox effortlessly with these time-saving email automations." },
            { "Task Management", "Stay on top of your to-do list with these effective task management tools." },
            { "Wellness At Work", "Enhance your well-being at work with these wellness-focused automations." },
            { "Communication", "Improve your communication efficiency with these smart automation tools." },
            { "Onboarding", "Simplify the onboarding process with these helpful onboarding automations." },
            { "ADO Management","Streamline your Azure DevOps workflows with these efficient automations." },
            { "Calendar Management", "Keep your schedule organized and up-to-date with these handy calendar tools." }
        };

    }
}
