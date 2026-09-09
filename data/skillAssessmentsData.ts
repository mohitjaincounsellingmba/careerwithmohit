export interface Question {
  id: number;
  question: string;
  options: [string, string, string, string];
  correctAnswer: number; // 0-indexed: 0, 1, 2, 3
  explanation: string;
}

export interface SkillDomain {
  id: string; // slug
  name: string;
  shortTitle: string;
  category: string;
  icon: string; // Lucide icon name or emoji
  gradient: string;
  badgeColor: string;
  description: string;
  syllabus: string[];
  passingScore: number; // e.g. 18.0
  totalQuestions: number; // 30
  timeLimitMinutes: number; // 30
  questions: Question[];
}

export const SKILL_DOMAINS: SkillDomain[] = [
  // =========================================================================
  // 1. POWER BI (30 QUESTIONS)
  // =========================================================================
  {
    id: "power-bi",
    name: "Power BI Data Modeling & Analytics",
    shortTitle: "Power BI",
    category: "Data & BI",
    icon: "BarChart3",
    gradient: "from-amber-500/20 via-yellow-500/10 to-orange-600/20",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    description: "Master DAX expressions, star schema modeling, Power Query transformations, row-level security (RLS), and interactive dashboard design.",
    syllabus: [
      "DAX CALCULATE, FILTER, ALL & Time Intelligence",
      "Star Schema vs Snowflake & Relationship Cardinality",
      "Power Query M-Code & ETL Transformations",
      "Row-Level Security (RLS) & Workspace Roles",
      "Performance Analyzer & Query Folding"
    ],
    passingScore: 18.0,
    totalQuestions: 30,
    timeLimitMinutes: 30,
    questions: [
      {
        id: 1,
        question: "In DAX, what does the CALCULATE function primarily do that sets it apart from standard aggregation functions?",
        options: [
          "It accelerates calculations by pre-aggregating data in memory cache",
          "It modifies the filter context of the calculation before evaluating the inner expression",
          "It converts row context into cell context without altering table relationships",
          "It forces evaluation to run strictly on the DirectQuery source instead of VertiPaq"
        ],
        correctAnswer: 1,
        explanation: "CALCULATE is the single most powerful function in DAX because it modifies the current filter context under which an expression is evaluated, and triggers context transition (converting row context into equivalent filter context)."
      },
      {
        id: 2,
        question: "Which DAX function returns all rows in a table or all values in a column, ignoring any filters applied in the report visual?",
        options: ["FILTER()", "ALL()", "KEEPFILTERS()", "VALUES()"],
        correctAnswer: 1,
        explanation: "ALL() removes all filter context from specified tables or columns, making it fundamental for computing denominators such as total grand sales percentage."
      },
      {
        id: 3,
        question: "What does 'Query Folding' in Power BI Power Query mean?",
        options: [
          "Merging multiple small tables into one unified wide dimension",
          "Translating Power Query transformation steps into native SQL/data source queries executed on the server",
          "Compressing the VertiPaq database columns to reduce file size",
          "Folding sub-queries into DAX measures automatically during dataset refresh"
        ],
        correctAnswer: 1,
        explanation: "Query Folding is the ability of Power Query to push transformation steps back to the source database as native queries (e.g., T-SQL), drastically improving refresh performance."
      },
      {
        id: 4,
        question: "In dimensional modeling for Power BI, why is a Star Schema strongly favored over a normalized Snowflake schema?",
        options: [
          "It takes up more disk space but allows unlimited measure branching",
          "It minimizes the number of table joins, optimizing VertiPaq column store traversal and compression",
          "It completely avoids the need for creating foreign key relationships",
          "It disables bidirectional cross-filtering across all dimension tables"
        ],
        correctAnswer: 1,
        explanation: "Star schemas have fewer relationship hops between dimensions and fact tables, which VertiPaq can scan and filter with maximum efficiency and high compression rates."
      },
      {
        id: 5,
        question: "What is the key difference between a Calculated Column and a Measure in Power BI?",
        options: [
          "Calculated columns are evaluated at query runtime, whereas measures are computed during data refresh",
          "Calculated columns consume RAM and disk space in the data model; measures are dynamic and calculated at report render time",
          "Measures can only operate on single rows, while calculated columns aggregate whole tables",
          "There is no performance difference between the two"
        ],
        correctAnswer: 1,
        explanation: "Calculated columns are computed during data refresh and stored permanently in the VertiPaq in-memory model, taking up RAM. Measures are calculated dynamically on the fly based on the user's filter context."
      },
      {
        id: 6,
        question: "Which DAX formula correctly calculates the Year-to-Date (YTD) total sales using a standard Date table?",
        options: [
          "TOTALYTD(SUM(Sales[Amount]), 'Date'[Date])",
          "YTD_SUM(Sales[Amount], ALL('Date'))",
          "CALCULATE(SUM(Sales[Amount]), DATESBETWEEN('Date'[Date], 0, 365))",
          "SUMX('Date', Sales[Amount] * 365)"
        ],
        correctAnswer: 0,
        explanation: "TOTALYTD(SUM(Sales[Amount]), 'Date'[Date]) evaluates the specified measure from the beginning of the year up to the latest date in the current filter context."
      },
      {
        id: 7,
        question: "What happens when you enable bidirectional cross-filtering on a 1-to-Many relationship between two dimension tables and a fact table?",
        options: [
          "It improves report loading speed by 50%",
          "It allows filters to propagate in both directions, but introduces risk of circular dependencies and ambiguous calculation paths",
          "It converts the VertiPaq engine into DirectQuery mode automatically",
          "It enforces Row-Level Security on both tables simultaneously"
        ],
        correctAnswer: 1,
        explanation: "Bidirectional cross-filtering allows filters to travel upstream from the many-side to the one-side. While useful occasionally, it often creates ambiguity, unexpected filter behavior, and severe performance degradation."
      },
      {
        id: 8,
        question: "What is the function of the Performance Analyzer pane in Power BI Desktop?",
        options: [
          "It measures the rendering time, DAX query duration, and DirectQuery wait times for individual visuals",
          "It optimizes SQL stored procedures on Azure databases",
          "It scans DAX formulas for syntax errors and suggests stylistic indentation",
          "It estimates the licensing cost of Power BI Premium capacity"
        ],
        correctAnswer: 0,
        explanation: "Performance Analyzer logs and displays durations (DAX query, visual display, and other times) for each visual on the report canvas, helping developers identify performance bottlenecks."
      },
      {
        id: 9,
        question: "Which DAX function is an iterator function that computes an expression for each row of a table and then sums the results?",
        options: ["SUM()", "SUMMARIZE()", "SUMX()", "AGGREGATEX()"],
        correctAnswer: 2,
        explanation: "SUMX() takes a table and iterates through each row evaluating the expression with row context, then aggregates the final results."
      },
      {
        id: 10,
        question: "How is Dynamic Row-Level Security (RLS) typically implemented in Power BI?",
        options: [
          "By creating a separate PBIX file for each department",
          "Using the USERPRINCIPALNAME() or USERNAME() DAX function inside role filter rules",
          "By locking the workspace permissions to Viewer only",
          "By password-protecting individual visuals in the dashboard"
        ],
        correctAnswer: 1,
        explanation: "Dynamic RLS matches the current user's login identity via USERPRINCIPALNAME() against an authorization/employee email table in the model to restrict visible data."
      },
      {
        id: 11,
        question: "In Power Query, what language are transformations written in under the hood?",
        options: ["DAX", "M Language (Mashup)", "Python", "Transact-SQL"],
        correctAnswer: 1,
        explanation: "Power Query uses the functional, case-sensitive M (Power Query Formula) language to define all extraction and transformation steps."
      },
      {
        id: 12,
        question: "What does the DIVIDE() function in DAX do when encountering a division by zero?",
        options: [
          "Throws a critical calculation error and crashes visual rendering",
          "Returns Infinity (INF)",
          "Returns BLANK() by default, or an optional alternate result specified by the author",
          "Returns a negative value equal to the numerator"
        ],
        correctAnswer: 2,
        explanation: "DIVIDE(Numerator, Denominator, [AlternateResult]) safely handles division by zero by returning BLANK() (or the 3rd argument) instead of throwing an error."
      },
      {
        id: 13,
        question: "What is the primary characteristic of Composite Models in Power BI?",
        options: [
          "Combining multiple Excel files into a single flat worksheet",
          "Combining DirectQuery sources and in-memory Import data within the same dataset",
          "Merging Python script outputs with R script visuals",
          "Exporting report pages simultaneously to PowerPoint and PDF"
        ],
        correctAnswer: 1,
        explanation: "A Composite Model allows a single Power BI dataset to mix tables loaded in Import mode with tables connected via DirectQuery or multiple DirectQuery sources."
      },
      {
        id: 14,
        question: "Which visual interaction option completely prevents a slicer from filtering a specific chart on the canvas?",
        options: ["Highlight", "Filter", "None", "Invert"],
        correctAnswer: 2,
        explanation: "Under Format > Edit Interactions, selecting 'None' disables filter propagation from the selected slicer to the target visual."
      },
      {
        id: 15,
        question: "What does ALLEXCEPT('Table', 'Table'[ColumnA]) achieve in a DAX measure?",
        options: [
          "Removes all filters from 'Table' EXCEPT the filter on 'ColumnA'",
          "Applies a permanent filter exclusively on 'ColumnA'",
          "Deletes 'ColumnA' from the visual output",
          "Converts 'ColumnA' into a measure"
        ],
        correctAnswer: 0,
        explanation: "ALLEXCEPT removes all context filters on the specified table except for the filters applied to the designated column(s)."
      },
      {
        id: 16,
        question: "Which storage mode in Power BI keeps data residing solely in the underlying relational database with queries generated on demand?",
        options: ["Import Mode", "Dual Mode", "DirectQuery Mode", "Incremental Cache"],
        correctAnswer: 2,
        explanation: "DirectQuery mode does not import data into VertiPaq; every visual interaction triggers on-the-fly SQL queries executed against the source database."
      },
      {
        id: 17,
        question: "What is an Incremental Refresh policy in Power BI dataset management?",
        options: [
          "Refreshing the dataset every 15 minutes continuously",
          "Refreshing only recent data that has changed or was newly added, while archiving older historical partitions",
          "Reloading only tables with less than 1,000 rows",
          "Compressing data after every user interaction"
        ],
        correctAnswer: 1,
        explanation: "Incremental Refresh partitions data into historical static partitions and recent dynamic partitions, refreshing only the latest slice using RangeStart and RangeEnd parameters."
      },
      {
        id: 18,
        question: "Which function converts an existing row context into an equivalent filter context?",
        options: ["FILTER()", "CALCULATE()", "EARLIER()", "RELATED()"],
        correctAnswer: 1,
        explanation: "CALCULATE triggers context transition: when called within a row context (like in a calculated column or iterator), it converts the current row values into an active filter context."
      },
      {
        id: 19,
        question: "What is the purpose of the 'Drillthrough' feature in Power BI reports?",
        options: [
          "Allows users to right-click a data point and navigate to a target page filtered to that specific entity",
          "Automatically updates data rows every 5 seconds",
          "Exports report raw data into a CSV file",
          "Transforms vertical columns into horizontal rows"
        ],
        correctAnswer: 0,
        explanation: "Drillthrough allows users to right-click an element (e.g., a specific store or customer) and jump to a detailed report page pre-filtered to that selected context."
      },
      {
        id: 20,
        question: "When should you use the USERELATIONSHIP() DAX function?",
        options: [
          "When you want to activate an inactive relationship for the duration of a specific measure calculation",
          "When creating a new physical relationship between two disparate databases",
          "When defining user security roles for Active Directory groups",
          "When establishing an automated web-scraping link"
        ],
        correctAnswer: 0,
        explanation: "USERELATIONSHIP enables an inactive relationship (such as a secondary date connection like OrderDate vs ShipDate) within a CALCULATE statement."
      },
      {
        id: 21,
        question: "What does the RELATED() DAX function require in order to retrieve a value from another table?",
        options: [
          "An existing active many-to-one relationship from the current table to the lookup table",
          "Both tables must have identical column counts",
          "A bidirectional many-to-many bridge table",
          "An active DirectQuery gateway connection"
        ],
        correctAnswer: 0,
        explanation: "RELATED() fetches values from the 'one' side of a many-to-one relationship while operating in a row context on the 'many' side table."
      },
      {
        id: 22,
        question: "In Power BI Service, what is the key difference between a Report and a Dashboard?",
        options: [
          "Dashboards can span multiple pages, whereas reports are single-page only",
          "Dashboards can pin visual tiles from multiple different reports and datasets; reports are bound to a single dataset",
          "Reports do not support DAX measures, while dashboards require them",
          "Dashboards are exclusively available on free Power BI accounts"
        ],
        correctAnswer: 1,
        explanation: "A dashboard is a single-screen canvas that can combine visual tiles sourced from multiple independent reports and datasets. A report is multi-page and tied to one dataset."
      },
      {
        id: 23,
        question: "What is the VertiPaq engine in Power BI?",
        options: [
          "A cloud rendering engine for SVG icons",
          "A columnar, in-memory database engine that achieves high data compression through dictionary encoding and run-length encoding",
          "An open-source SQL compiler for big data lakes",
          "A backup scheduler for on-premises enterprise gateways"
        ],
        correctAnswer: 1,
        explanation: "VertiPaq is the underlying columnar in-memory database engine that powers Power BI and Analysis Services Tabular, utilizing sophisticated column encoding techniques."
      },
      {
        id: 24,
        question: "Which of the following DAX functions returns a single-column table containing unique values from a column, respecting the current filter context?",
        options: ["DISTINCT()", "ALLNOBLANKROW()", "UNION()", "SUMMARIZECOLUMNS()"],
        correctAnswer: 0,
        explanation: "DISTINCT() returns a single-column table of unique values while honoring the ambient filter context (unlike ALL which ignores filters)."
      },
      {
        id: 25,
        question: "What is the purpose of 'Bookmarking' in Power BI reports?",
        options: [
          "To bookmark external URLs for easy reference",
          "To capture the current state of a report page (filters, slicers, visual visibility) for custom navigation and storytelling",
          "To flag erroneous DAX measures for review",
          "To highlight cells in a matrix visual with conditional colors"
        ],
        correctAnswer: 1,
        explanation: "Bookmarks save the configuration of visual elements, slicer states, and visibility, allowing developers to create tabbed interfaces, popups, and storytelling flows."
      },
      {
        id: 26,
        question: "In Power Query, what does 'Unpivot Columns' accomplish?",
        options: [
          "Transforms attribute-value pairs from columns into tidy rows, converting wide tables into normalized tall tables",
          "Combines two rows by adding their numeric contents together",
          "Transposes the entire dataset upside down",
          "Deletes columns that contain null values"
        ],
        correctAnswer: 0,
        explanation: "Unpivot takes wide tabular data (e.g., Month columns: Jan, Feb, Mar) and converts them into standardized Attribute and Value row pairs suitable for relational modeling."
      },
      {
        id: 27,
        question: "Which DAX function is specifically engineered to handle Semi-Additive measures such as inventory balance at the close of a period?",
        options: ["CLOSINGBALANCEMONTH()", "PREVIOUSDAY()", "SAMEPERIODLASTYEAR()", "FIRSTNONBLANK()"],
        correctAnswer: 0,
        explanation: "CLOSINGBALANCEMONTH evaluates an expression at the last date of the current month, making it ideal for non-additive metrics like bank or inventory balances."
      },
      {
        id: 28,
        question: "Why should you avoid high-cardinality columns (such as precise timestamps or GUIDs) in Power BI Import models?",
        options: [
          "They cannot be formatted as strings",
          "High cardinality drastically reduces VertiPaq dictionary compression efficiency and explodes memory footprint",
          "They disable relationship joins between fact tables",
          "They trigger automatic DirectQuery fallback"
        ],
        correctAnswer: 1,
        explanation: "Columnar databases compress repeated values exceptionally well. Unique values (high cardinality) prevent dictionary compression, drastically increasing memory usage."
      },
      {
        id: 29,
        question: "What is the primary role of an On-Premises Data Gateway in Power BI?",
        options: [
          "To convert DAX syntax to Python code",
          "To securely bridge and transfer data between cloud Power BI Service and on-premise relational databases/files behind a corporate firewall",
          "To encrypt PDF exports of dashboards",
          "To host Power BI Desktop licenses on an intranet"
        ],
        correctAnswer: 1,
        explanation: "The On-Premises Data Gateway acts as a secure reverse-proxy communication channel allowing Power BI Service in Azure to refresh datasets from internal corporate networks."
      },
      {
        id: 30,
        question: "What is the result of using KEEPFILTERS() around a filter argument in a CALCULATE function?",
        options: [
          "It overwrites any outer filter context completely",
          "It intersects the new filter with existing context instead of overwriting conflicting filters",
          "It permanently locks the visual so end users cannot change slicers",
          "It converts measures into cached calculated tables"
        ],
        correctAnswer: 1,
        explanation: "Standard CALCULATE filters overwrite outer filters on the same column. Wrapping the filter in KEEPFILTERS() preserves the existing context and computes the intersection."
      }
    ]
  },

  // =========================================================================
  // 2. TABLEAU (30 QUESTIONS)
  // =========================================================================
  {
    id: "tableau",
    name: "Tableau Visual Analytics & Dashboards",
    shortTitle: "Tableau",
    category: "Data & BI",
    icon: "PieChart",
    gradient: "from-blue-600/20 via-cyan-500/10 to-indigo-600/20",
    badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    description: "Deep dive into Level of Detail (LOD) expressions, table calculations, blending vs relationships, dashboard actions, and story points.",
    syllabus: [
      "Level of Detail (LOD): FIXED, INCLUDE, EXCLUDE",
      "Table Calculations & Order of Operations",
      "Data Relationships vs Physical Joins vs Blends",
      "Parameters, Sets & Context Filters",
      "Visual Best Practices & Dashboard Optimization"
    ],
    passingScore: 18.0,
    totalQuestions: 30,
    timeLimitMinutes: 30,
    questions: [
      {
        id: 1,
        question: "In Tableau's Order of Operations, which filter type is evaluated BEFORE Dimension Filters but AFTER Extract Filters?",
        options: ["Measure Filters", "Table Calculation Filters", "Context Filters", "Data Source Filters"],
        correctAnswer: 2,
        explanation: "The hierarchy is: Extract Filters -> Data Source Filters -> Context Filters -> FIXED LOD -> Dimension Filters -> INCLUDE/EXCLUDE LOD -> Measure Filters -> Table Calc Filters."
      },
      {
        id: 2,
        question: "What is the primary distinction of a FIXED Level of Detail (LOD) expression in Tableau?",
        options: [
          "It computes values using only the dimensions in the view",
          "It computes values using specified dimensions without reference to the dimensions present in the current view",
          "It is evaluated after Table Calculation filters",
          "It can only be used with discrete dimensions"
        ],
        correctAnswer: 1,
        explanation: "{FIXED [Region] : SUM([Sales])} evaluates at the exact level of detail defined in the formula, completely ignoring which dimensions are on the Rows/Columns shelf."
      },
      {
        id: 3,
        question: "What happens when you add a Dimension filter to 'Context' in Tableau (turning its pill grey)?",
        options: [
          "It causes the filter to be evaluated before FIXED LOD expressions and top-N filters",
          "It restricts the dashboard to administrative users only",
          "It converts the dimension into a continuous green measure",
          "It permanently removes the filtered records from the underlying hyper file"
        ],
        correctAnswer: 0,
        explanation: "A Context Filter creates a temporary table in memory, which runs before FIXED LODs and Top/Bottom N conditional filters in the Tableau pipeline."
      },
      {
        id: 4,
        question: "What is the visual indicator of a Continuous field versus a Discrete field on Tableau shelves?",
        options: [
          "Continuous fields are Green; Discrete fields are Blue",
          "Continuous fields are Blue; Discrete fields are Green",
          "Continuous fields have an italicized font",
          "Discrete fields always show an aggregation prefix like SUM or AVG"
        ],
        correctAnswer: 0,
        explanation: "Blue pills represent Discrete fields (which create headers/labels), while Green pills represent Continuous fields (which generate unbroken numerical axes)."
      },
      {
        id: 5,
        question: "How does Tableau's modern 'Logical Layer' (Relationships / Noodles) differ from traditional Physical Joins?",
        options: [
          "Relationships do not require matching keys",
          "Relationships maintain tables independently at their native grain, querying and aggregating data only at visualization time without data duplication",
          "Physical joins are always slower than relationships in all scenarios",
          "Relationships can only connect Excel files"
        ],
        correctAnswer: 1,
        explanation: "Tableau Relationships (noodles) preserve table independence. Tableau queries each table at its native grain dynamically, preventing unintended fan-outs/duplication common in pre-joined tables."
      },
      {
        id: 6,
        question: "Which of the following is a Quick Table Calculation in Tableau?",
        options: [
          "Running Total",
          "CONCATENATE()",
          "DATEDIFF()",
          "CASE WHEN THEN END"
        ],
        correctAnswer: 0,
        explanation: "Running Total, Percent of Total, Difference, and Moving Average are built-in Quick Table Calculations that operate on the aggregated marks in the view."
      },
      {
        id: 7,
        question: "What is the scope and direction of a Table Calculation when set to 'Table (Across)'?",
        options: [
          "Computes across the entire table from top to bottom",
          "Computes horizontally across the length of the table, resetting at every row partition",
          "Computes diagonally across coordinate matrices",
          "Computes across all worksheets in the current workbook"
        ],
        correctAnswer: 1,
        explanation: "'Table (Across)' computes horizontally across columns within the same row, evaluating marks sequentially from left to right."
      },
      {
        id: 8,
        question: "In Tableau, what is the key difference between an EXCLUDE LOD and an INCLUDE LOD expression?",
        options: [
          "EXCLUDE subtracts dimensions from the view's level of detail, while INCLUDE adds dimensions not present in the visual view",
          "EXCLUDE runs before context filters, while INCLUDE runs before extract filters",
          "EXCLUDE generates discrete dimensions, while INCLUDE generates continuous measures",
          "They are identical synonyms in Tableau calculation syntax"
        ],
        correctAnswer: 0,
        explanation: "INCLUDE calculates at a finer grain by adding dimensions to the view level, whereas EXCLUDE aggregates at a coarser grain by removing specified dimensions from the view level."
      },
      {
        id: 9,
        question: "What file extension does a Tableau Packaged Workbook have, which bundles both the sheets and the local extract data?",
        options: [".twb", ".twbx", ".tds", ".hyper"],
        correctAnswer: 1,
        explanation: ".twbx is a packaged workbook that includes the .twb XML instructions plus all packaged local files, data extracts, and background imagery."
      },
      {
        id: 10,
        question: "How do 'Parameters' function in Tableau visualizations?",
        options: [
          "They are static database constraints that cannot be edited",
          "They are workbook-wide dynamic variables that can replace constant values in calculations, filters, and reference lines",
          "They automatically translate dashboards into multiple human languages",
          "They enforce password authentication on published worksheets"
        ],
        correctAnswer: 1,
        explanation: "Parameters are global dynamic inputs (numbers, dates, or strings) that can be adjusted by users to feed into calculated fields, top-N filters, or reference lines."
      },
      {
        id: 11,
        question: "What is a 'Dual Axis' chart commonly used for in Tableau?",
        options: [
          "Comparing two metrics with different scales or marks (e.g., a Bar of Sales and a Line of Profit Ratio) overlaid on the same canvas",
          "Dividing a single measure into two halves on opposite sides of the screen",
          "Creating a 3D stereoscopic rendering of data points",
          "Merging two unrelated data sources without keys"
        ],
        correctAnswer: 0,
        explanation: "Dual Axis overlays two independent measures on opposing axes (left and right), enabling customized combined visual types like bar-and-line combinations."
      },
      {
        id: 12,
        question: "What is Tableau's in-memory data engine technology introduced to replace TDE?",
        options: ["VertiPaq", "Hyper", "Parquet", "Spark Engine"],
        correctAnswer: 1,
        explanation: "Hyper is Tableau's high-performance in-memory data engine technology designed for fast data ingestion and sub-second analytical query execution."
      },
      {
        id: 13,
        question: "What does the ZN() function do in Tableau calculations?",
        options: [
          "Converts string text to zero-length strings",
          "Returns the expression if it is not null, otherwise returns 0",
          "Calculates the statistical z-score of a distribution",
          "Normalizes coordinates between 0 and 1"
        ],
        correctAnswer: 1,
        explanation: "ZN(expression) evaluates whether a measure is NULL; if null, it safely replaces it with 0 to prevent downstream calculation blanks."
      },
      {
        id: 14,
        question: "Which feature allows users to group members into flexible cohorts that can be dynamically updated via Set Actions?",
        options: ["Bins", "Sets", "Hierarchies", "Aliases"],
        correctAnswer: 1,
        explanation: "Sets are custom subsets of data defined by condition or manual picking. With Set Actions, users can dynamically swap items in and out of sets by clicking marks."
      },
      {
        id: 15,
        question: "In Tableau Data Blending, what is the default join behavior between the Primary and Secondary data sources?",
        options: [
          "Full Outer Join",
          "Left Join at the aggregated level of the linking dimensions in the view",
          "Inner Join at the raw record level",
          "Cross Product join"
        ],
        correctAnswer: 1,
        explanation: "Data Blending simulates a Left Join: data from the secondary source is aggregated first to the level of the linking dimensions and joined to the primary source."
      },
      {
        id: 16,
        question: "What is the purpose of 'Story Points' in Tableau?",
        options: [
          "Tracking developer sprint velocity in Jira",
          "A sequence of interactive visualizations or dashboards organized step-by-step to walk viewers through an analytical narrative",
          "Allocating memory quotas per user session",
          "Assigning difficulty scores to worksheets"
        ],
        correctAnswer: 1,
        explanation: "Tableau Stories let authors assemble a sequential flow of sheets and dashboards with explanatory captions to present a guided data narrative."
      },
      {
        id: 17,
        question: "Which of the following functions will calculate the rank of marks while giving identical values the same rank and skipping subsequent ranks?",
        options: ["RANK_DENSE()", "RANK_MODIFIED()", "RANK()", "RANK_PERCENTILE()"],
        correctAnswer: 2,
        explanation: "RANK() assigns identical ranks to ties and skips numbers (e.g., 1, 2, 2, 4). RANK_DENSE() does not skip numbers (e.g., 1, 2, 2, 3)."
      },
      {
        id: 18,
        question: "What does the WINDOW_AVG() function do in a Tableau calculation?",
        options: [
          "Returns the average of an expression across a defined window/partition of the visual table",
          "Averages data across all open browser tabs",
          "Finds the mean of the raw database rows before any visual grouping",
          "Computes the time-weighted moving standard deviation"
        ],
        correctAnswer: 0,
        explanation: "WINDOW_AVG(SUM([Sales]), -2, 0) is a table calculation that computes the average of the aggregated mark over a designated window offset."
      },
      {
        id: 19,
        question: "What happens when you drop a measure onto the 'Detail' mark card in Tableau?",
        options: [
          "It adds detailed numerical text labels to each mark",
          "It changes the level of granularity of the visualization without adding visible shelf headers",
          "It filters out outlier records automatically",
          "It changes the color palette to grayscale"
        ],
        correctAnswer: 1,
        explanation: "Dropping a dimension or measure onto Detail increases the level of granularity (dividing the visual into smaller marks) without drawing explicit axes or rows."
      },
      {
        id: 20,
        question: "Which dashboard layout container ensures that its child objects resize evenly along the horizontal direction?",
        options: ["Tiled Container", "Horizontal Layout Container", "Vertical Layout Container", "Grid Canvas"],
        correctAnswer: 1,
        explanation: "A Horizontal Container groups objects side-by-side, allowing authors to distribute them evenly or adjust their relative widths fluidly."
      },
      {
        id: 21,
        question: "What is the purpose of a 'Reference Band' in a Tableau chart?",
        options: [
          "To display musical waveforms",
          "To shade an area between two points or confidence intervals on an axis (e.g., 25th to 75th percentiles)",
          "To underline titles of top performing products",
          "To hide classified corporate figures"
        ],
        correctAnswer: 1,
        explanation: "Reference bands shade an area between two values (such as target minimums and maximums, or confidence intervals) along a numeric axis."
      },
      {
        id: 22,
        question: "How can you boost Tableau Server dashboard load performance for complex workbooks?",
        options: [
          "Use Custom SQL for all data connections",
          "Maximize the number of quick filters with 'All Values in Database'",
          "Use Tableau Data Extracts (Hyper), limit high-cardinality marks, and use guided navigation instead of rendering 50 sheets at once",
          "Convert all dashboards into static image files"
        ],
        correctAnswer: 2,
        explanation: "Optimizing dashboard performance includes using native extracts, avoiding excessive marks on canvas, minimizing complex cascading filters, and hiding unused fields."
      },
      {
        id: 23,
        question: "What is an 'Action Filter' on a Tableau dashboard?",
        options: [
          "A rule that triggers an email alert when sales exceed a threshold",
          "An interactive mechanism where selecting or hovering over a mark in one sheet automatically filters other sheets on the dashboard",
          "An administrative script that backs up workbooks nightly",
          "A calculated field with multiple nested IF-THEN clauses"
        ],
        correctAnswer: 1,
        explanation: "Filter Actions allow user interactions (hover, select, or menu) in a primary visual to send target values as filters to other destination sheets."
      },
      {
        id: 24,
        question: "Which formula properly computes Profit Ratio in Tableau to prevent the 'sum of ratios' aggregation trap?",
        options: [
          "[Profit] / [Sales]",
          "SUM([Profit]) / SUM([Sales])",
          "AVG([Profit] / [Sales])",
          "TOTAL([Profit] / [Sales])"
        ],
        correctAnswer: 1,
        explanation: "SUM([Profit]) / SUM([Sales]) computes the ratio after summing the totals. In contrast, [Profit]/[Sales] computes row-level ratios that produce mathematical errors when aggregated."
      },
      {
        id: 25,
        question: "What does the 'ATTR()' aggregation function return if all rows in a partition have the same value?",
        options: [
          "An asterisk (*)",
          "The unique value itself",
          "NULL",
          "0"
        ],
        correctAnswer: 1,
        explanation: "ATTR(X) evaluates MIN(X) == MAX(X). If all records share the same value, it returns that value; if multiple distinct values exist, it returns an asterisk (*)."
      },
      {
        id: 26,
        question: "What is the primary function of 'Tableau Prep Builder'?",
        options: [
          "To design marketing logos for dashboards",
          "To visually clean, shape, reshape, combine, and schedule ETL flows before data analysis",
          "To write machine learning algorithms in C++",
          "To purchase enterprise user licenses"
        ],
        correctAnswer: 1,
        explanation: "Tableau Prep is a dedicated visual ETL tool that helps analysts cleanse, pivot, merge, and transform raw data into optimized extracts for Tableau Desktop."
      },
      {
        id: 27,
        question: "Which of the following functions parses a string into a date format?",
        options: ["STR()", "DATEPARSE()", "DATENAME()", "DATEPART()"],
        correctAnswer: 1,
        explanation: "DATEPARSE('format', string) takes text formatted according to specific pattern codes and converts it into a native Date or DateTime field."
      },
      {
        id: 28,
        question: "In Tableau, what type of chart is constructed using a circle mark type with geographic latitude and longitude on the shelves?",
        options: ["Symbol Map", "Filled Choropleth Map", "Treemap", "Box Plot"],
        correctAnswer: 0,
        explanation: "Symbol maps plot individual data marks (circles, squares, icons) at precise geographic coordinates, where size and color can reflect metrics."
      },
      {
        id: 29,
        question: "What does the PREVIOUS_VALUE() table calculation function do?",
        options: [
          "Returns the value of the calculation from the previous row or partition, useful for recursive calculations",
          "Retrieves yesterday's database backup",
          "Undoes the last formatting change in Tableau Desktop",
          "Returns the earliest timestamp in the dataset"
        ],
        correctAnswer: 0,
        explanation: "PREVIOUS_VALUE(default) returns the evaluated value of the current calculation from the previous record, making it the only recursive table calculation in Tableau."
      },
      {
        id: 30,
        question: "What is the key benefit of publishing a 'Published Data Source' to Tableau Server or Cloud?",
        options: [
          "It forces all users to view the data in black and white",
          "It creates a centralized, governed, single source of truth that multiple workbooks can connect to and refresh on a schedule",
          "It reduces network bandwidth to zero",
          "It converts relational data into unindexed flat text files"
        ],
        correctAnswer: 1,
        explanation: "Published Data Sources provide centralized data governance, reusable certified modeling, standardized calculated fields, and scheduled extract refreshes for an entire organization."
      }
    ]
  },

  // =========================================================================
  // 3. SIX SIGMA (30 QUESTIONS)
  // =========================================================================
  {
    id: "six-sigma",
    name: "Six Sigma Green Belt Quality Management",
    shortTitle: "Six Sigma",
    category: "Operations & Quality",
    icon: "Target",
    gradient: "from-emerald-600/20 via-teal-500/10 to-cyan-600/20",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    description: "Master DMAIC phases, process capability metrics (Cp, Cpk), control charts, root cause analysis (Ishikawa, Pareto), and hypothesis testing.",
    syllabus: [
      "DMAIC Methodology (Define, Measure, Analyze, Improve, Control)",
      "Process Capability: Cp, Cpk, Pp, Ppk & DPMO",
      "Statistical Process Control (SPC) & Control Charts",
      "Root Cause Analysis: Pareto 80/20, Ishikawa, 5 Whys",
      "Hypothesis Testing & Measurement System Analysis (Gage R&R)"
    ],
    passingScore: 18.0,
    totalQuestions: 30,
    timeLimitMinutes: 30,
    questions: [
      {
        id: 1,
        question: "A process operating at a true Six Sigma quality level produces how many Defects Per Million Opportunities (DPMO), assuming a standard 1.5 sigma shift?",
        options: ["3.4 DPMO", "66,807 DPMO", "233 DPMO", "0.01 DPMO"],
        correctAnswer: 0,
        explanation: "By mathematical definition in Six Sigma literature, accounting for an empirical long-term 1.5 sigma process drift, 6-sigma corresponds to 3.4 defects per million opportunities."
      },
      {
        id: 2,
        question: "What are the five phases of the core Six Sigma improvement methodology?",
        options: [
          "Design, Model, Automate, Iterate, Check",
          "Define, Measure, Analyze, Improve, Control (DMAIC)",
          "Discover, Manage, Audit, Inspect, Close",
          "Draft, Metric, Assemble, Inspect, Certify"
        ],
        correctAnswer: 1,
        explanation: "DMAIC (Define, Measure, Analyze, Improve, Control) is the standardized data-driven improvement cycle for existing processes in Lean Six Sigma."
      },
      {
        id: 3,
        question: "What does the Project Charter established in the 'Define' phase contain as a core element?",
        options: [
          "Problem statement, business case, goal statement, project scope, team members, and milestone timeline",
          "The full C++ source code of the manufacturing software",
          "The personal performance reviews of all factory employees",
          "The legal non-disclosure agreement for suppliers only"
        ],
        correctAnswer: 0,
        explanation: "A Project Charter is the foundational contract between the project team and executive sponsor detailing the problem statement, business case, scope boundaries, goal metrics, and milestones."
      },
      {
        id: 4,
        question: "What is the primary purpose of a SIPOC diagram in the Define phase?",
        options: [
          "To calculate ANOVA p-values for variance",
          "To provide a high-level visual representation of Suppliers, Inputs, Process, Outputs, and Customers",
          "To measure the electrical conductivity of machine parts",
          "To replace the corporate annual financial audit"
        ],
        correctAnswer: 1,
        explanation: "SIPOC (Suppliers, Inputs, Process, Outputs, Customers) gives all stakeholders a clear, bird's-eye view of process boundaries and critical flow elements before diving into deep metrics."
      },
      {
        id: 5,
        question: "What is the key difference between Process Capability indices Cp and Cpk?",
        options: [
          "Cp measures capability based strictly on spread, while Cpk accounts for both process spread and process centering relative to specification limits",
          "Cp is for service processes, while Cpk is strictly for chemical engineering",
          "Cpk cannot exceed 1.0 under any circumstances",
          "Cp includes long-term drift, whereas Cpk ignores standard deviation"
        ],
        correctAnswer: 0,
        explanation: "Cp evaluates the maximum potential capability (spread vs specification width). Cpk accounts for the actual centering of the process mean between the Upper and Lower Specification Limits (USL & LSL)."
      },
      {
        id: 6,
        question: "If a process has a Cpk value less than 1.0, what does this indicate to a Six Sigma Green Belt?",
        options: [
          "The process is exceptionally capable and produces zero defects",
          "The process is not capable, meaning parts of the process distribution fall outside the specification limits producing defects",
          "The measurement system has 100% repeatability",
          "The process should immediately be automated without investigation"
        ],
        correctAnswer: 1,
        explanation: "A Cpk < 1.0 means the 3-sigma process limits exceed customer specifications, meaning defective products or service failures are actively being generated."
      },
      {
        id: 7,
        question: "What does Pareto's 80/20 Principle assert when applied to defect reduction?",
        options: [
          "80% of employees create 20% of the defects",
          "Approximately 80% of process problems or defects are caused by roughly 20% of the vital root causes",
          "Projects should spend 80% of budget on software and 20% on training",
          "Any process with 80% capability requires 20 days to fix"
        ],
        correctAnswer: 1,
        explanation: "Vilfredo Pareto's rule indicates that the majority of effects (80%) come from a vital few causes (20%), directing teams to prioritize high-impact issues first."
      },
      {
        id: 8,
        question: "What is an Ishikawa diagram also commonly known as in root cause analysis?",
        options: ["Gantt Chart", "Fishbone Diagram or Cause-and-Effect Diagram", "Scatter Matrix", "Histogram"],
        correctAnswer: 1,
        explanation: "Developed by Kaoru Ishikawa, the Fishbone Diagram categorizes potential causes of problems into branches (such as Man, Machine, Method, Material, Measurement, and Milieu)."
      },
      {
        id: 9,
        question: "In Statistical Process Control (SPC), what is the difference between 'Common Cause' and 'Special Cause' variation?",
        options: [
          "Common cause is unpredictable; special cause happens every day",
          "Common cause is inherent natural random noise in the system; special cause stems from specific external non-random assignable factors",
          "Common cause can be eliminated with a single meeting; special cause requires firing the supervisor",
          "There is no mathematical difference in control chart interpretation"
        ],
        correctAnswer: 1,
        explanation: "Common cause variation is inherent, predictable, and systemic to the stable process. Special cause variation is caused by external assignable disturbances that require immediate identification and removal."
      },
      {
        id: 10,
        question: "Which control chart is most appropriate for tracking continuous data collected in subgroups of size n = 4 to 6?",
        options: ["p-chart", "c-chart", "X-bar and R chart (Mean and Range)", "u-chart"],
        correctAnswer: 2,
        explanation: "X-bar and R charts are the industry standard for monitoring continuous variable data when sample subgroup sizes are small (typically between 2 and 9)."
      },
      {
        id: 11,
        question: "Which control chart should be selected to monitor the number of defective units when sample subgroup sizes vary?",
        options: ["p-chart", "np-chart", "c-chart", "I-MR chart"],
        correctAnswer: 0,
        explanation: "A p-chart tracks the proportion of nonconforming (defective) items when the sample size n varies from subgroup to subgroup."
      },
      {
        id: 12,
        question: "What is the primary focus of Measurement System Analysis (Gage R&R)?",
        options: [
          "To evaluate the repeatability (equipment variation) and reproducibility (operator variation) of a measurement system",
          "To test the financial credit rating of equipment vendors",
          "To measure the physical speed of the factory conveyor belt",
          "To count the number of defects delivered to customers"
        ],
        correctAnswer: 0,
        explanation: "Gage R&R evaluates whether the measurement system itself is trustworthy by isolating variations caused by the measuring device (Repeatability) and different operators (Reproducibility)."
      },
      {
        id: 13,
        question: "In Gage R&R, what percentage of total process variation is generally considered acceptable for a measurement system to be deemed capable?",
        options: ["Under 10%", "Between 30% and 50%", "Over 80%", "Exactly 100%"],
        correctAnswer: 0,
        explanation: "AIAG guidelines state that a Gage R&R under 10% is fully acceptable. 10% to 30% may be acceptable depending on application criticality; over 30% is considered unacceptable."
      },
      {
        id: 14,
        question: "What is a 'Type I Error' (Alpha risk) in hypothesis testing?",
        options: [
          "Failing to reject the null hypothesis when it is actually false",
          "Rejecting the null hypothesis when it is actually true (False Positive)",
          "Entering erroneous data into Minitab or Python",
          "Failing to document meeting minutes"
        ],
        correctAnswer: 1,
        explanation: "A Type I error occurs when you reject a true null hypothesis (declaring a difference exists when in reality it does not, also known as alpha risk or false alarm)."
      },
      {
        id: 15,
        question: "In hypothesis testing, if the calculated p-value is 0.02 and the chosen significance level (alpha) is 0.05, what is the statistical decision?",
        options: [
          "Fail to reject the null hypothesis",
          "Reject the null hypothesis (statistically significant result)",
          "Discard the test and collect 1,000 new samples",
          "Assume both hypotheses are simultaneously true"
        ],
        correctAnswer: 1,
        explanation: "The golden rule is 'If the p-value is low (p < alpha), the null must go!' Because 0.02 < 0.05, we reject H0 and conclude the effect is statistically significant."
      },
      {
        id: 16,
        question: "Which statistical test is used to compare the means of THREE or more independent groups with continuous, normally distributed data?",
        options: ["1-sample t-test", "2-sample t-test", "ANOVA (Analysis of Variance)", "Chi-Square Test of Independence"],
        correctAnswer: 2,
        explanation: "One-Way ANOVA is used to determine whether there are any statistically significant differences between the means of three or more independent groups."
      },
      {
        id: 17,
        question: "What Japanese term in Lean refers to 'Waste' that must be systematically identified and eliminated?",
        options: ["Kaizen", "Muda", "Poka-Yoke", "Gemba"],
        correctAnswer: 1,
        explanation: "Muda is the Japanese term for waste (activity that consumes resources without creating customer value). Lean targets 8 classic forms of Muda (DOWNTIME)."
      },
      {
        id: 18,
        question: "What does the Lean concept 'Poka-Yoke' stand for?",
        options: ["Continuous small increments", "Mistake-proofing or error-proofing mechanisms", "Visual factory signboards", "Just-In-Time delivery"],
        correctAnswer: 1,
        explanation: "Poka-Yoke refers to mistake-proofing devices or steps built into a process to prevent human errors from occurring or immediately catching defects."
      },
      {
        id: 19,
        question: "What does 'Takt Time' represent in Lean manufacturing and service delivery?",
        options: [
          "The total time a worker takes to finish their shift",
          "The pace of production needed to match customer demand (Available Net Time / Customer Demand)",
          "The transit time between two warehouses",
          "The maximum speed a machine can safely run without maintenance"
        ],
        correctAnswer: 1,
        explanation: "Takt Time is the heartbeat of a Lean system: the rate at which finished units must be completed to satisfy incoming customer demand."
      },
      {
        id: 20,
        question: "What are the 5S steps in workplace organization?",
        options: [
          "Start, Speed, Standard, Stop, Share",
          "Sort, Set in order, Shine, Standardize, Sustain (Seiri, Seiton, Seiso, Seiketsu, Shitsuke)",
          "Safety, Sales, Strategy, Staff, Service",
          "Scan, Solve, Simplify, Specify, Supervise"
        ],
        correctAnswer: 1,
        explanation: "5S represents Sort (remove unneeded items), Set in order (organize necessary items), Shine (clean the workspace), Standardize (establish rules), and Sustain (maintain discipline)."
      },
      {
        id: 21,
        question: "What is the primary tool used in the 'Control' phase to ensure process improvements do not backslide over time?",
        options: [
          "Process Control Plan and Standard Operating Procedures (SOPs)",
          "A project celebration dinner",
          "A brainstorm sticky note board",
          "An organizational chart"
        ],
        correctAnswer: 0,
        explanation: "A Process Control Plan specifies measurement frequencies, control methods, reaction plans, and SOPs to maintain process gains in the long run."
      },
      {
        id: 22,
        question: "What is Failure Mode and Effects Analysis (FMEA) primarily used for?",
        options: [
          "Calculating sales commissions for field representatives",
          "A structured proactive risk assessment tool to identify potential failure modes, causes, and quantify risk via the Risk Priority Number (RPN)",
          "Designing the corporate visual brand guidelines",
          "Auditing payroll deductions"
        ],
        correctAnswer: 1,
        explanation: "FMEA proactively identifies potential system failures and ranks them by Severity, Occurrence, and Detection to calculate the Risk Priority Number (RPN = S x O x D)."
      },
      {
        id: 23,
        question: "How is the Risk Priority Number (RPN) in FMEA calculated?",
        options: [
          "Severity + Occurrence + Detection",
          "Severity x Occurrence x Detection",
          "(Severity x Occurrence) / Detection",
          "Max(Severity, Occurrence) x 10"
        ],
        correctAnswer: 1,
        explanation: "RPN is the product of three ratings: Severity (S), Occurrence probability (O), and Detection capability (D), each rated on a 1 to 10 scale."
      },
      {
        id: 24,
        question: "In Value Stream Mapping (VSM), which activities are categorized as 'Non-Value-Added but Necessary' (Type 1 Muda)?",
        options: [
          "Customer-requested custom engraving",
          "Regulatory compliance, financial reporting, or required legal inspections",
          "Scrap parts thrown in the trash bin",
          "Reprocessing parts that failed the first inspection"
        ],
        correctAnswer: 1,
        explanation: "Type 1 Muda activities add no direct value in the customer's eyes but are legally or operationally mandated (such as accounting audits or safety inspections)."
      },
      {
        id: 25,
        question: "What does the Central Limit Theorem state that enables statistical inference in Six Sigma?",
        options: [
          "All processes in nature are naturally centered at zero",
          "As sample size n becomes sufficiently large, the distribution of sample means approaches a normal distribution, regardless of the underlying population shape",
          "Six Sigma projects always produce cost savings within 6 months",
          "Every defect can be eliminated with sufficient machine calibration"
        ],
        correctAnswer: 1,
        explanation: "The Central Limit Theorem ensures that given a large enough sample size (typically n >= 30), the sampling distribution of the mean will be normally distributed."
      },
      {
        id: 26,
        question: "Which of the following is an example of an 'Attribute' (Discrete) data type?",
        options: [
          "Thickness of a steel sheet in millimeters",
          "Number of rejected loan applications in a day (Pass/Fail count)",
          "Temperature of an injection mold in Celsius",
          "Weight of a coffee bag in kilograms"
        ],
        correctAnswer: 1,
        explanation: "Attribute data is countable qualitative or categorical data (e.g., number of defects, pass/fail, yes/no), unlike continuous variable data which is measured on an unbroken scale."
      },
      {
        id: 27,
        question: "What is the primary role of a Six Sigma 'Champion' or 'Sponsor'?",
        options: [
          "To write statistical macros in Python",
          "To provide strategic alignment, allocate project resources, remove organizational roadblocks, and approve charters",
          "To operate manufacturing machinery during trials",
          "To collect manual stopwatch time data on the shop floor"
        ],
        correctAnswer: 1,
        explanation: "Champions are senior executive leaders who select projects, clear operational barriers, provide funding/resources, and hold accountability for business outcomes."
      },
      {
        id: 28,
        question: "In an X-bar and R control chart, what does a data point falling outside the Upper Control Limit (UCL) signify?",
        options: [
          "The machine must be permanently replaced",
          "A special cause of variation is present that must be investigated and resolved",
          "Customer specifications have officially changed",
          "The process is in perfect statistical control"
        ],
        correctAnswer: 1,
        explanation: "Points beyond 3-sigma control limits represent assignable/special causes of variation, indicating the process is statistically out of control."
      },
      {
        id: 29,
        question: "What is 'Lead Time' in a process flow?",
        options: [
          "The time an executive takes to make a decision",
          "The total elapsed time from when a customer order is placed until the finished product or service is delivered",
          "The setup time required to change a tool",
          "The time a machine spends idling between batches"
        ],
        correctAnswer: 1,
        explanation: "Lead time encompasses total latency: the complete clock time required for work to move through the entire value stream from initial request to receipt by the customer."
      },
      {
        id: 30,
        question: "What is the difference between Cp and Pp?",
        options: [
          "Cp uses short-term within-subgroup standard deviation, whereas Pp uses overall (long-term) sample standard deviation",
          "Pp is used only for packaging industries",
          "Cp is evaluated in the Control phase, while Pp is only for the Define phase",
          "Pp never accounts for sample size"
        ],
        correctAnswer: 0,
        explanation: "Cp/Cpk measure short-term process capability using within-subgroup variation (R-bar/d2 or S-bar/c4). Pp/Ppk measure long-term process performance using overall standard deviation."
      }
    ]
  },

  // =========================================================================
  // 4. SQL (30 QUESTIONS)
  // =========================================================================
  {
    id: "sql",
    name: "SQL Database Queries & Architecture",
    shortTitle: "SQL",
    category: "Data & Engineering",
    icon: "Database",
    gradient: "from-purple-600/20 via-indigo-500/10 to-violet-600/20",
    badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    description: "Test advanced SQL querying: complex joins, window functions (ROW_NUMBER, DENSE_RANK), CTEs, aggregations with HAVING, and query indexing.",
    syllabus: [
      "Window Functions: RANK, DENSE_RANK, ROW_NUMBER, LEAD/LAG",
      "Advanced Joins: INNER, LEFT, FULL OUTER & CROSS JOIN",
      "Common Table Expressions (CTEs) & Recursive CTEs",
      "Aggregations: GROUP BY, HAVING, ROLLUP & CUBE",
      "Indexing, Query Execution Plans & ACID Transactions"
    ],
    passingScore: 18.0,
    totalQuestions: 30,
    timeLimitMinutes: 30,
    questions: [
      {
        id: 1,
        question: "What is the key difference between RANK() and DENSE_RANK() in SQL window functions?",
        options: [
          "RANK() skips subsequent rank numbers after ties; DENSE_RANK() assigns consecutive rank numbers without skipping",
          "DENSE_RANK() cannot be used with an ORDER BY clause",
          "RANK() is an aggregate function; DENSE_RANK() is a scalar function",
          "RANK() works only on integer columns; DENSE_RANK() works only on dates"
        ],
        correctAnswer: 0,
        explanation: "If two rows tie for 1st place, RANK() outputs 1, 1, 3. DENSE_RANK() outputs 1, 1, 2 without leaving any gaps in the ranking sequence."
      },
      {
        id: 2,
        question: "In standard SQL execution order, which clause is evaluated FIRST by the database engine?",
        options: ["SELECT", "FROM", "WHERE", "ORDER BY"],
        correctAnswer: 1,
        explanation: "The logical processing order is: FROM/JOIN -> WHERE -> GROUP BY -> HAVING -> SELECT -> DISTINCT -> ORDER BY -> LIMIT/OFFSET."
      },
      {
        id: 3,
        question: "Why does the following query trigger an error: `SELECT department_id, AVG(salary) FROM employees WHERE AVG(salary) > 50000 GROUP BY department_id;`?",
        options: [
          "AVG cannot be computed on salary",
          "Aggregate functions cannot be used in a WHERE clause; filtering on aggregated values must be placed in a HAVING clause",
          "The column department_id must be in descending order",
          "GROUP BY must appear before WHERE"
        ],
        correctAnswer: 1,
        explanation: "WHERE filters individual rows before grouping takes place. Aggregated calculations like AVG() can only be filtered in the HAVING clause."
      },
      {
        id: 4,
        question: "What does a CROSS JOIN between a table with 10 rows and a table with 5 rows produce?",
        options: ["15 rows", "50 rows (Cartesian Product)", "5 rows", "An ambiguous join error"],
        correctAnswer: 1,
        explanation: "A CROSS JOIN pairs every row from the first table with every row from the second table, producing a Cartesian product of 10 x 5 = 50 rows."
      },
      {
        id: 5,
        question: "What does the LEAD() window function do in SQL?",
        options: [
          "Returns the lead engineer's employee ID",
          "Accesses data from a subsequent row at a specified physical offset within the partition without a self-join",
          "Sorts the partition in ascending order automatically",
          "Finds the maximum value in the entire table"
        ],
        correctAnswer: 1,
        explanation: "LEAD(column, offset) looks ahead by 'offset' rows from the current row in the designated window partition, enabling simple period-over-period comparisons."
      },
      {
        id: 6,
        question: "What is the primary benefit of a Common Table Expression (CTE) defined with the `WITH` keyword?",
        options: [
          "It permanently writes a new table to the hard disk",
          "It improves query readability and modularity, and can be referenced recursively for hierarchical tree traversal",
          "It encrypts database columns in transit",
          "It disables transaction logging to speed up inserts"
        ],
        correctAnswer: 1,
        explanation: "CTEs create temporary named result sets that make complex nested queries readable and maintainable, and support recursive logic for organizational/graph data."
      },
      {
        id: 7,
        question: "Which SQL clause removes duplicate rows from the final result set?",
        options: ["UNIQUE", "DISTINCT", "DIFFERENT", "ISOLATE"],
        correctAnswer: 1,
        explanation: "SELECT DISTINCT removes all duplicate rows from the evaluated output columns."
      },
      {
        id: 8,
        question: "What is the difference between UNION and UNION ALL?",
        options: [
          "UNION combines results and removes duplicate rows; UNION ALL retains all rows including duplicates and is significantly faster",
          "UNION works only on numerical data; UNION ALL works on text",
          "UNION requires the tables to have different columns",
          "There is no difference in modern RDBMS"
        ],
        correctAnswer: 0,
        explanation: "UNION performs an internal distinct sorting operation to eliminate duplicate records. UNION ALL appends rows without checking, resulting in superior query performance."
      },
      {
        id: 9,
        question: "What happens when comparing a column to NULL using `= NULL` instead of `IS NULL`?",
        options: [
          "It returns all rows where the value is 0",
          "It evaluates to UNKNOWN (neither TRUE nor FALSE in 3-valued logic), returning zero rows",
          "It returns all non-null rows",
          "It throws a syntax parsing exception"
        ],
        correctAnswer: 1,
        explanation: "In SQL's three-valued logic, NULL represents unknown data. Any equality comparison like `x = NULL` evaluates to UNKNOWN, which evaluates as false in WHERE filters."
      },
      {
        id: 10,
        question: "What does the COALESCE() function do?",
        options: [
          "Combines two string columns together",
          "Returns the first non-null argument in a list of values",
          "Rounds floating point numbers to the nearest integer",
          "Calculates the covariance between two series"
        ],
        correctAnswer: 1,
        explanation: "COALESCE(val1, val2, ... valN) evaluates its arguments sequentially and returns the first value that is not NULL."
      },
      {
        id: 11,
        question: "What is a Clustered Index on a relational database table?",
        options: [
          "An index that stores pointer addresses to rows in arbitrary order",
          "An index that physically dictates and arranges the actual storage order of the data rows in the table",
          "A special index used exclusively for full-text search",
          "An index that can be applied to up to 50 columns per table"
        ],
        correctAnswer: 1,
        explanation: "A Clustered Index determines the physical on-disk storage order of table data. Because data can only be physically sorted one way, there can only be one clustered index per table."
      },
      {
        id: 12,
        question: "What is the purpose of the `PARTITION BY` sub-clause inside an `OVER()` clause?",
        options: [
          "To physically repartition the hard disk into separate partitions",
          "To divide the result set into independent subsets over which the window function is independently calculated",
          "To truncate old historical data older than 90 days",
          "To distribute queries across multiple database nodes"
        ],
        correctAnswer: 1,
        explanation: "PARTITION BY divides the rows into groups (e.g. by department_id) so the window calculation resets its calculation independently for each subset."
      },
      {
        id: 13,
        question: "What does the `HAVING` clause do that the `WHERE` clause cannot?",
        options: [
          "Filters rows based on aggregate calculations applied to groups",
          "Sorts rows in reverse alphabetical order",
          "Joins tables located across different servers",
          "Limits the total number of rows returned"
        ],
        correctAnswer: 0,
        explanation: "HAVING filters groups of rows based on conditions that involve aggregate calculations (e.g., HAVING COUNT(*) > 5), which WHERE cannot do."
      },
      {
        id: 14,
        question: "What is a Correlated Subquery?",
        options: [
          "A subquery that runs once independently before the outer query begins",
          "A subquery that depends on and references columns from the outer query, executing repeatedly for each row evaluated by the outer query",
          "A query that correlates two random number generators",
          "A query with multiple CTEs joined together"
        ],
        correctAnswer: 1,
        explanation: "A correlated subquery references values from the parent/outer query and must be evaluated repeatedly for each candidate row processed by the outer query."
      },
      {
        id: 15,
        question: "What does ACID stand for in database transaction management?",
        options: [
          "Action, Consistency, Indexing, Durability",
          "Atomicity, Consistency, Isolation, Durability",
          "Access, Control, Integrity, Distribution",
          "Aggregation, Concurrency, Iteration, Deletion"
        ],
        correctAnswer: 1,
        explanation: "ACID guarantees reliability in database transactions: Atomicity (all or nothing), Consistency (preserves constraints), Isolation (concurrent executions do not interfere), and Durability (committed changes survive system crashes)."
      },
      {
        id: 16,
        question: "What is a 'Dirty Read' in database concurrency?",
        options: [
          "A query reading uncommitted data written by another concurrent transaction that might later be rolled back",
          "A query reading corrupted sectors from a damaged hard drive",
          "A query executing without an index on a large table",
          "A query containing deprecated syntax"
        ],
        correctAnswer: 0,
        explanation: "A dirty read occurs when Transaction A reads data modified by Transaction B before Transaction B commits. If Transaction B rolls back, Transaction A worked with invalid ghost data."
      },
      {
        id: 17,
        question: "Which isolation level prevents Dirty Reads and Non-Repeatable Reads, but may still allow Phantom Reads?",
        options: ["Read Uncommitted", "Read Committed", "Repeatable Read", "Serializable"],
        correctAnswer: 2,
        explanation: "Repeatable Read locks rows read by a query so they cannot be modified (preventing non-repeatable reads), but newly inserted rows by other transactions can still appear (phantom reads)."
      },
      {
        id: 18,
        question: "Which SQL constraint ensures that all values in a column are distinct and cannot contain NULLs?",
        options: ["UNIQUE", "FOREIGN KEY", "PRIMARY KEY", "CHECK"],
        correctAnswer: 2,
        explanation: "A PRIMARY KEY uniquely identifies each record. It inherently enforces both UNIQUEness and NOT NULL constraints on the column(s)."
      },
      {
        id: 19,
        question: "What will `SELECT 10 / 4;` return in databases like SQL Server or PostgreSQL when both operands are integers?",
        options: ["2.5", "2 (integer division truncated)", "3", "NULL"],
        correctAnswer: 1,
        explanation: "Integer division truncates the fractional part, yielding 2. To obtain 2.5, at least one operand must be cast to a float/numeric (e.g., 10.0 / 4)."
      },
      {
        id: 20,
        question: "What does the SQL command `TRUNCATE TABLE employees;` do compared to `DELETE FROM employees;`?",
        options: [
          "TRUNCATE deletes all rows rapidly by deallocating pages, without firing row-level delete triggers, and usually resets identity seeds",
          "TRUNCATE removes the table definition entirely from the database schema",
          "TRUNCATE is much slower than DELETE because it logs each row individually",
          "TRUNCATE requires a WHERE clause"
        ],
        correctAnswer: 0,
        explanation: "TRUNCATE is a DDL operation that deallocates data pages rather than logging individual row deletions, making it much faster than DELETE while resetting identity counters."
      },
      {
        id: 21,
        question: "Which window function divides an ordered partition into a specified number of roughly equal groups (e.g., quartiles)?",
        options: ["CUME_DIST()", "PERCENT_RANK()", "NTILE(n)", "WIDTH_BUCKET()"],
        correctAnswer: 2,
        explanation: "NTILE(n) buckets rows in an ordered partition into 'n' numbered groups from 1 to n (e.g. NTILE(4) creates quartiles)."
      },
      {
        id: 22,
        question: "What does the `EXISTS` operator test for in a subquery?",
        options: [
          "Whether the subquery column contains any non-zero values",
          "Whether the subquery returns ANY rows at all (evaluates to TRUE as soon as the first matching row is found)",
          "Whether the referenced table exists in the schema catalog",
          "Whether the database server is running"
        ],
        correctAnswer: 1,
        explanation: "EXISTS returns TRUE as soon as a single matching record satisfies the subquery, making it more efficient than IN for large sets because execution short-circuits."
      },
      {
        id: 23,
        question: "What is the purpose of an Index Seek versus an Index Scan in query execution plans?",
        options: [
          "Index Scan navigates directly to specific leaf nodes; Index Seek scans the entire table",
          "Index Seek uses the B-tree structure to jump directly to specific qualifying rows; Index Scan inspects all pages of the index from start to finish",
          "There is no difference in efficiency between Seek and Scan",
          "Index Seek is only available on NoSQL systems"
        ],
        correctAnswer: 1,
        explanation: "An Index Seek is highly targeted: it navigates the B-Tree directly to the matching keys. An Index Scan traverses the entire index linearly, which is much more I/O intensive."
      },
      {
        id: 24,
        question: "What does the `GROUP BY ROLLUP(year, region, product)` extension generate?",
        options: [
          "Only the basic grouping of year, region, product",
          "Hierarchical subtotal aggregations for (year, region, product), (year, region), (year), and a grand total",
          "All 2^3 = 8 possible permutations of grouping sets",
          "A pivot table rotated 90 degrees"
        ],
        correctAnswer: 1,
        explanation: "ROLLUP creates progressive hierarchical subtotals from right to left, finishing with a grand total."
      },
      {
        id: 25,
        question: "What happens when you perform an INNER JOIN between two tables and there are multiple matching rows on both sides?",
        options: [
          "The engine throws an integrity constraint violation",
          "The output duplicates rows according to the Cartesian match between the corresponding join keys",
          "Only the first matching row is returned and subsequent matches are ignored",
          "All matching rows are merged into a single comma-separated string"
        ],
        correctAnswer: 1,
        explanation: "If a join key matches 3 rows in Table A and 4 rows in Table B, the INNER JOIN will output 3 x 4 = 12 combined rows."
      },
      {
        id: 26,
        question: "Which string function finds the position of a substring within a string in standard SQL?",
        options: ["FIND()", "POSITION() or INSTR() / CHARINDEX()", "LOCATE_SUB()", "INDEXOF()"],
        correctAnswer: 1,
        explanation: "Standard ANSI SQL uses POSITION(substr IN str), while Oracle/MySQL commonly support INSTR() and SQL Server uses CHARINDEX()."
      },
      {
        id: 27,
        question: "What does the `ROW_NUMBER()` function guarantee when applied to a result set with ties in the `ORDER BY` column?",
        options: [
          "It assigns identical numbers to ties",
          "It assigns unique sequential integers starting from 1 to each row, with the tie-breaking order being non-deterministic unless additional sorting columns are specified",
          "It throws an ambiguity error",
          "It returns fractional numbers"
        ],
        correctAnswer: 1,
        explanation: "ROW_NUMBER() strictly outputs unique integers (1, 2, 3...) with no duplicates, arbitrarily breaking ties unless subsequent unique tiebreaker columns are added to ORDER BY."
      },
      {
        id: 28,
        question: "What is a Database View?",
        options: [
          "A physical hardware monitor attached to the server rack",
          "A stored, virtual table defined by a SQL query that does not store data itself (unless materialized) but presents data on demand",
          "A snapshot of table data exported to Excel",
          "A security firewall rule for remote connections"
        ],
        correctAnswer: 1,
        explanation: "A View is a virtual table representing the result of a stored query. When queried, the database dynamically executes the view's definition (unless indexed/materialized)."
      },
      {
        id: 29,
        question: "What does the `ON DELETE CASCADE` referential action do?",
        options: [
          "Prevents the parent row from being deleted if any child rows exist",
          "Automatically deletes all associated child records in foreign key tables when the referenced parent row is deleted",
          "Backs up deleted records to an archive table",
          "Prompts the user with a confirmation dialog before deleting"
        ],
        correctAnswer: 1,
        explanation: "ON DELETE CASCADE maintains referential integrity by automatically wiping child rows that point to a parent primary key that was just deleted."
      },
      {
        id: 30,
        question: "Which clause is used to handle error trapping and transaction rollback in modern stored procedures?",
        options: ["TRY...CATCH block", "ON ERROR GOTO 0", "ASSERT TRUE", "IF FAILURE ROLLBACK"],
        correctAnswer: 0,
        explanation: "Most modern enterprise SQL engines (such as T-SQL) use BEGIN TRY ... END TRY BEGIN CATCH ... END CATCH to catch exceptions and execute ROLLBACK TRANSACTION safely."
      }
    ]
  },

  // =========================================================================
  // 5. ADVANCED EXCEL (30 QUESTIONS)
  // =========================================================================
  {
    id: "advanced-excel",
    name: "Advanced Excel, Formulas & Automation",
    shortTitle: "Advanced Excel",
    category: "Productivity & Analytics",
    icon: "FileSpreadsheet",
    gradient: "from-emerald-500/20 via-green-500/10 to-teal-600/20",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    description: "Evaluate mastery of XLOOKUP, dynamic arrays (FILTER, UNIQUE, SORT), Pivot Tables, Power Query, What-If Analysis, and VBA automation.",
    syllabus: [
      "XLOOKUP vs INDEX/MATCH vs VLOOKUP",
      "Dynamic Array Formulas: FILTER, UNIQUE, SORT, SEQUENCE",
      "Pivot Tables: Calculated Fields, Slicers & Timelines",
      "Data Analysis: Goal Seek, Solver & Data Tables",
      "VBA Macros, Error Handling & Advanced Formatting"
    ],
    passingScore: 18.0,
    totalQuestions: 30,
    timeLimitMinutes: 30,
    questions: [
      {
        id: 1,
        question: "What major limitation of traditional VLOOKUP does the modern XLOOKUP function resolve?",
        options: [
          "XLOOKUP can look to the left of the return array, defaults to exact match without needing FALSE, and handles missing values natively",
          "XLOOKUP is restricted to lookup tables with fewer than 100 rows",
          "XLOOKUP only works on numeric values",
          "XLOOKUP requires columns to be sorted in ascending order"
        ],
        correctAnswer: 0,
        explanation: "XLOOKUP separates the lookup array from the return array (allowing leftward lookups), defaults to exact match (match_mode=0), and includes built-in [if_not_found] handling."
      },
      {
        id: 2,
        question: "What error occurs when a dynamic array formula (like FILTER or SORT) cannot output its results because existing data occupies adjacent cells?",
        options: ["#VALUE!", "#SPILL!", "#REF!", "#N/A"],
        correctAnswer: 1,
        explanation: "The #SPILL! error occurs when the spill range calculated by a dynamic array formula is obstructed by existing values, merged cells, or table boundaries."
      },
      {
        id: 3,
        question: "What does the spill operator `#` (hash) do when appended to a cell reference, such as `=SUM(A2#)`?",
        options: [
          "Converts numbers into currency format",
          "References the entire dynamic spill range originating from cell A2",
          "Comments out the formula",
          "Rounds values to the nearest integer"
        ],
        correctAnswer: 1,
        explanation: "The spill range operator (#) references the entire set of returned values spilled from a dynamic array formula starting at that anchor cell."
      },
      {
        id: 4,
        question: "Which formula returns an array of unique values from column A, sorted alphabetically?",
        options: [
          "=SORT(UNIQUE(A2:A100))",
          "=ALPHABETICAL(DISTINCT(A2:A100))",
          "=FILTER(A2:A100, UNIQUE=TRUE)",
          "=ORDERBY(A2:A100)"
        ],
        correctAnswer: 0,
        explanation: "Nesting UNIQUE inside SORT (=SORT(UNIQUE(A2:A100))) extracts all distinct values and automatically sorts them in ascending order."
      },
      {
        id: 5,
        question: "In an INDEX/MATCH combination `=INDEX(C2:C50, MATCH(E2, A2:A50, 0))`, what does the MATCH function do?",
        options: [
          "Calculates the sum of cells in A2:A50",
          "Finds the relative row position of the value E2 within the range A2:A50",
          "Replaces values in C2:C50 with E2",
          "Checks if E2 is an even number"
        ],
        correctAnswer: 1,
        explanation: "MATCH searches for E2 in range A2:A50 and returns its relative 1-based index position, which INDEX then uses to fetch the corresponding value from C2:C50."
      },
      {
        id: 6,
        question: "What is the key difference between a Pivot Table 'Calculated Field' and a 'Calculated Item'?",
        options: [
          "Calculated Fields create new rows; Calculated Items create new columns",
          "A Calculated Field applies a formula across an entire field (summing individual fields first); a Calculated Item performs calculations on individual elements within a single field",
          "Calculated Fields can only be used with text data",
          "There is no difference in calculation logic"
        ],
        correctAnswer: 1,
        explanation: "Calculated Fields perform calculations using the sum of other existing fields. Calculated Items evaluate custom formulas using the individual members (items) of a specific field."
      },
      {
        id: 7,
        question: "What tool under the 'What-If Analysis' menu in Excel allows you to find the exact input value required to achieve a desired target output in a formula cell?",
        options: ["Scenario Manager", "Goal Seek", "Consolidate", "Text to Columns"],
        correctAnswer: 1,
        explanation: "Goal Seek is a back-solving tool that alters one specific input variable iteratively until a formula cell reaches the desired target value."
      },
      {
        id: 8,
        question: "When should you use the Excel 'Solver' add-in instead of 'Goal Seek'?",
        options: [
          "When you need to adjust multiple changing cells simultaneously subject to defined constraints and bounds",
          "When creating pie charts with 3D shadows",
          "When you only need to change a single variable without constraints",
          "When converting currencies between countries"
        ],
        correctAnswer: 0,
        explanation: "Solver handles complex linear and non-linear optimization with multiple changing variables and multiple mathematical constraints (min, max, integer bounds)."
      },
      {
        id: 9,
        question: "What does the formula `=FILTER(A2:C50, B2:B50=\"Finance\", \"No Records\")` return if no employees belong to the Finance department?",
        options: [
          "#N/A error",
          "The text string 'No Records'",
          "A blank empty cell",
          "The first row of the range"
        ],
        correctAnswer: 1,
        explanation: "The third argument of FILTER is `[if_empty]`, which returns the specified fallback value (in this case 'No Records') when no rows meet the criteria."
      },
      {
        id: 10,
        question: "What is the shortcut key in Windows Excel to toggle between relative, absolute ($A$1), and mixed ($A1, A$1) cell references while editing a formula?",
        options: ["F2", "F4", "F9", "Ctrl + Shift + L"],
        correctAnswer: 1,
        explanation: "Pressing F4 cycles through reference types: A1 -> $A$1 -> A$1 -> $A1 -> A1."
      },
      {
        id: 11,
        question: "What does the LET() function in Excel enable formula authors to do?",
        options: [
          "Assign names to calculation results inside a formula, improving readability and eliminating redundant sub-formula evaluations",
          "Send emails automatically via Outlook",
          "Lock cells without entering a workbook password",
          "Convert uppercase letters to lowercase"
        ],
        correctAnswer: 0,
        explanation: "LET(name1, value1, ..., calculation) defines intermediate variables within a formula, boosting calculation performance and clarity."
      },
      {
        id: 12,
        question: "Which function calculates the monthly payment on a loan with a fixed interest rate and constant number of periods?",
        options: ["IPMT()", "PPMT()", "PMT()", "NPER()"],
        correctAnswer: 2,
        explanation: "PMT(rate, nper, pv, [fv], [type]) computes the total periodic payment (principal + interest) for an annuity or amortized loan."
      },
      {
        id: 13,
        question: "What is the primary function of the LAMBDA() function in modern Excel?",
        options: [
          "To format cells with Greek symbols",
          "To create custom, reusable functions using native Excel formula syntax without writing VBA or JavaScript",
          "To import AWS Lambda serverless functions into spreadsheets",
          "To calculate matrix eigenvalues"
        ],
        correctAnswer: 1,
        explanation: "LAMBDA allows users to build custom, parameter-driven functions in pure Excel syntax and register them under the Name Manager as reusable custom functions."
      },
      {
        id: 14,
        question: "What does the SUMIFS() function require regarding the dimensions of its sum range and criteria ranges?",
        options: [
          "All criteria ranges must have the exact same number of rows and columns as the sum_range",
          "The sum_range must always be larger than the criteria ranges",
          "The criteria ranges must be sorted in ascending order",
          "Only one criteria range can be evaluated at a time"
        ],
        correctAnswer: 0,
        explanation: "In SUMIFS, each criteria_range must have the exact same dimensions (shape and row count) as the sum_range, or Excel returns a #VALUE! error."
      },
      {
        id: 15,
        question: "In a dynamic array formula, what does `=SEQUENCE(12, 1, 100, 10)` generate?",
        options: [
          "A single sum value of 1,200",
          "A vertical column of 12 numbers starting at 100 and stepping by 10 (100, 110, 120, ..., 210)",
          "A random sequence of 12 dates",
          "A grid of 12 rows and 10 columns filled with zeros"
        ],
        correctAnswer: 1,
        explanation: "SEQUENCE(rows, [columns], [start], [step]) generates an array of sequential numbers: 12 rows, 1 column, starting at 100, incrementing by 10."
      },
      {
        id: 16,
        question: "What does the IFERROR() function do when its primary expression evaluates successfully without issues?",
        options: [
          "Returns the value_if_error argument anyway",
          "Returns the actual evaluated result of the formula",
          "Returns a boolean TRUE",
          "Clears the cell content"
        ],
        correctAnswer: 1,
        explanation: "IFERROR(value, value_if_error) returns the evaluated value if no error is encountered; it only triggers the second argument if an error (#N/A, #VALUE!, etc.) occurs."
      },
      {
        id: 17,
        question: "Which feature in Excel allows you to restrict user inputs to a specific dropdown list or valid numeric range?",
        options: ["Conditional Formatting", "Data Validation", "Text to Columns", "Format Painter"],
        correctAnswer: 1,
        explanation: "Data Validation (Alt + A + V + V) enforces data entry constraints, such as dropdown list selections, date boundaries, or whole number limits."
      },
      {
        id: 18,
        question: "What does the keyboard shortcut `Ctrl + Shift + L` do in Excel?",
        options: [
          "Inserts a hyperlink",
          "Applies or removes AutoFilters across the current data table",
          "Locks the current worksheet",
          "Aligns text to the left margin"
        ],
        correctAnswer: 1,
        explanation: "Ctrl + Shift + L toggles the AutoFilter dropdown buttons on the header row of the active data range."
      },
      {
        id: 19,
        question: "In VBA (Visual Basic for Applications), what statement is used to disable screen flickering and drastically speed up macro execution?",
        options: [
          "Application.ScreenUpdating = False",
          "System.FreezeScreen(True)",
          "DoEvents.Stop()",
          "Display.FastMode = 1"
        ],
        correctAnswer: 0,
        explanation: "Setting Application.ScreenUpdating = False prevents Excel from redrawing the screen after every cell operation during macro execution, significantly speeding up runtime."
      },
      {
        id: 20,
        question: "What file extension must an Excel file have to store executable VBA macro code?",
        options: [".xlsx", ".xlsm (or .xlsb)", ".csv", ".xltx"],
        correctAnswer: 1,
        explanation: "Standard .xlsx files strip all VBA code upon saving for security. Macro-enabled workbooks must be saved as .xlsm or binary .xlsb files."
      },
      {
        id: 21,
        question: "Which function joins text from multiple cells and allows you to ignore empty cells while specifying a delimiter?",
        options: ["CONCATENATE()", "TEXTJOIN()", "JOIN()", "MERGE()"],
        correctAnswer: 1,
        explanation: "TEXTJOIN(delimiter, ignore_empty, text1, ...) combines multiple strings using a designated delimiter and can automatically skip blank cells."
      },
      {
        id: 22,
        question: "What does the INDIRECT() function do in Excel?",
        options: [
          "Returns the cell reference specified by a text string",
          "Creates a hidden link to an external website",
          "Calculates interest compounded daily",
          "Randomly selects a cell from a range"
        ],
        correctAnswer: 0,
        explanation: "INDIRECT(\"B\" & 5) converts the text string \"B5\" into an actual live cell reference to cell B5, enabling dynamic worksheet and cell referencing."
      },
      {
        id: 23,
        question: "What does the OFFSET() function return?",
        options: [
          "The distance between two worksheets in pixels",
          "A reference to a range that is a specified number of rows and columns away from a starting cell reference",
          "The current timestamp offset from UTC",
          "The percentage margin of an investment"
        ],
        correctAnswer: 1,
        explanation: "OFFSET(reference, rows, cols, [height], [width]) returns a dynamic range offset by a specified coordinate distance from a starting cell."
      },
      {
        id: 24,
        question: "Why is OFFSET considered a 'volatile' function, and why should it be used cautiously in large models?",
        options: [
          "It crashes Excel if cells are blank",
          "It recalculates every time ANY calculation occurs in the workbook, even if its source data did not change, slowing down workbook performance",
          "It can only be used on 32-bit operating systems",
          "It deletes undo history permanently"
        ],
        correctAnswer: 1,
        explanation: "Volatile functions (OFFSET, INDIRECT, TODAY, NOW) recalculate upon any workbook change, regardless of dependencies, causing severe lag in large models."
      },
      {
        id: 25,
        question: "What is the purpose of the 'Flash Fill' (Ctrl + E) feature in Excel?",
        options: [
          "Fills the background color of selected cells with neon yellow",
          "Automatically senses data patterns from adjacent columns and extracts, formats, or combines text without complex formulas",
          "Refreshes external SQL connections in a flash",
          "Deletes all formula errors in one click"
        ],
        correctAnswer: 1,
        explanation: "Flash Fill (Ctrl + E) uses machine learning pattern detection to automatically split, reformat, or concatenate text strings based on user examples."
      },
      {
        id: 26,
        question: "What does the CHOOSECOLS() dynamic array function do?",
        options: [
          "Highlights columns in bright red",
          "Returns specific columns from an array based on their numerical index positions",
          "Hides unused columns from view",
          "Counts the total number of columns in a worksheet"
        ],
        correctAnswer: 1,
        explanation: "CHOOSECOLS(array, col_num1, col_num2, ...) allows users to extract and reorder specific columns from a larger dataset dynamically."
      },
      {
        id: 27,
        question: "How do you reference a table column named 'Sales' inside an official Excel Table named 'Orders' using structured referencing?",
        options: [
          "Orders.Sales",
          "Orders[Sales]",
          "Orders->Sales",
          "$Orders$Sales"
        ],
        correctAnswer: 1,
        explanation: "Excel structured table references use square brackets: TableName[ColumnName], making formulas resilient to column insertions and deletions."
      },
      {
        id: 28,
        question: "In financial modeling, what does the XNPV() function provide that standard NPV() does not?",
        options: [
          "Calculates net present value for cash flows that occur at irregular, specific calendar dates rather than equal periodic intervals",
          "Applies a zero percent discount rate",
          "Ignores initial negative cash outflows",
          "Calculates inflation automatically using government data"
        ],
        correctAnswer: 0,
        explanation: "Standard NPV assumes equal, periodic annual intervals. XNPV(rate, values, dates) discounts each individual cash flow according to its exact calendar date."
      },
      {
        id: 29,
        question: "What is the purpose of a 'Timeline' slicer in an Excel Pivot Table?",
        options: [
          "To show a project Gantt chart",
          "To provide an interactive visual slider for filtering Pivot Tables by Years, Quarters, Months, or Days on date fields",
          "To track how many minutes a user spent editing a spreadsheet",
          "To set an expiration date after which the workbook locks"
        ],
        correctAnswer: 1,
        explanation: "A Timeline slicer connects to date fields in a Pivot Table, allowing users to quickly slide across time horizons (years, quarters, months, days)."
      },
      {
        id: 30,
        question: "Which formula calculates the number of working days between two dates, excluding weekends and a custom holiday range?",
        options: [
          "DAYS360(start_date, end_date)",
          "NETWORKDAYS(start_date, end_date, [holidays])",
          "WORKDAY_COUNT(start_date, end_date)",
          "DATEDIF(start_date, end_date, \"W\")"
        ],
        correctAnswer: 1,
        explanation: "NETWORKDAYS(start, end, [holidays]) computes total working days between two dates, excluding Saturdays, Sundays, and any dates listed in the holidays range."
      }
    ]
  },

  // =========================================================================
  // 6. DIGITAL MARKETING (30 QUESTIONS)
  // =========================================================================
  {
    id: "digital-marketing",
    name: "Digital Marketing, SEO & Performance Ads",
    shortTitle: "Digital Marketing",
    category: "Marketing & Growth",
    icon: "Megaphone",
    gradient: "from-rose-500/20 via-pink-500/10 to-red-600/20",
    badgeColor: "bg-rose-500/20 text-rose-300 border-rose-500/30",
    description: "Assess SEO on-page & technical signals, Google Ads PPC bidding strategies, Meta performance funnels, CAC vs LTV unit economics, and analytics.",
    syllabus: [
      "Technical & On-Page SEO (Canonical, Robots.txt, Core Web Vitals)",
      "Google Ads: Ad Rank, Quality Score, Bidding & Match Types",
      "Paid Social: Meta Pixel, Conversions API (CAPI) & Custom Audiences",
      "Unit Economics: CAC, LTV, ROAS & Attribution Modeling",
      "Email Marketing Automation, Deliverability & Conversion Rate Optimization (CRO)"
    ],
    passingScore: 18.0,
    totalQuestions: 30,
    timeLimitMinutes: 30,
    questions: [
      {
        id: 1,
        question: "What three core factors determine Google Ads 'Ad Rank' for a search query?",
        options: [
          "Bid Amount, Quality Score (Expected CTR, Ad Relevance, Landing Page Experience), and Ad Assets/Format impact",
          "The age of the domain, total website page count, and server location",
          "The company's social media follower count, Ad budget, and keyword length",
          "Only the highest monetary bid placed by the advertiser"
        ],
        correctAnswer: 0,
        explanation: "Ad Rank is calculated using: Max CPC Bid, Quality Score components (Expected CTR, Ad Relevance, Landing Page Experience), and the expected impact of ad assets/extensions."
      },
      {
        id: 2,
        question: "What is the primary function of a `rel=\"canonical\"` tag in technical SEO?",
        options: [
          "To translate the web page into multiple languages",
          "To specify the preferred master URL of a webpage to search engines, preventing duplicate content dilution",
          "To block search engine spiders from indexing the page",
          "To accelerate page loading speed through CDN caching"
        ],
        correctAnswer: 1,
        explanation: "The canonical tag tells search engines which version of a URL represents the authoritative master copy, consolidating ranking signals across duplicate or parameterized URLs."
      },
      {
        id: 3,
        question: "Which Core Web Vitals metric measures visual stability and unexpected layout shifting of elements on a webpage?",
        options: ["Largest Contentful Paint (LCP)", "Interaction to Next Paint (INP)", "Cumulative Layout Shift (CLS)", "First Byte Latency (TTFB)"],
        correctAnswer: 2,
        explanation: "Cumulative Layout Shift (CLS) measures visual stability by tracking sudden layout shifts while a user is reading or interacting with the page."
      },
      {
        id: 4,
        question: "What does ROAS stand for, and how is it calculated in performance marketing?",
        options: [
          "Return on Ad Spend = (Total Revenue Generated from Ads / Total Ad Spend)",
          "Rate of Audience Sentiment = (Positive Reviews / Total Impressions)",
          "Return on Asset Sales = (Net Profit / Total Corporate Assets)",
          "Ratio of Acquisition Spend = (Ad Spend / Total Website Visitors)"
        ],
        correctAnswer: 0,
        explanation: "ROAS (Return on Ad Spend) measures the gross revenue generated for every rupee/dollar invested into advertising campaigns: Revenue from Ads / Ad Spend."
      },
      {
        id: 5,
        question: "In keyword match types for Google Ads, which syntax represents 'Exact Match'?",
        options: ["\"keyword\"", "+keyword", "[keyword]", "-keyword"],
        correctAnswer: 2,
        explanation: "[keyword] brackets denote Exact Match in Google Ads, serving ads on queries with the same intent or close variants without extra intervening words."
      },
      {
        id: 6,
        question: "What is the main advantage of implementing Meta's Conversions API (CAPI) alongside the standard browser Pixel?",
        options: [
          "It lowers the cost per click to zero automatically",
          "It shares web events directly from the server to Meta, overcoming browser tracking limitations like ad blockers, Safari ITP, and iOS privacy changes",
          "It creates AI video ads without human designers",
          "It allows running ads on competitor Facebook pages"
        ],
        correctAnswer: 1,
        explanation: "Conversions API (CAPI) sends conversion events server-to-server directly to Meta, circumventing client-side ad blockers, cookie deprecation, and iOS tracking restrictions."
      },
      {
        id: 7,
        question: "If a business spends ₹50,000 on ads and acquires 25 paying customers, what is their Customer Acquisition Cost (CAC)?",
        options: ["₹1,000", "₹2,000", "₹5,000", "₹500"],
        correctAnswer: 1,
        explanation: "CAC = Total Marketing & Sales Spend / Total New Customers Acquired = ₹50,000 / 25 = ₹2,000 per customer."
      },
      {
        id: 8,
        question: "In Google Analytics 4 (GA4), what is the foundational measurement model that replaced Universal Analytics' session/pageview model?",
        options: [
          "Event-based tracking model (where all user interactions, including page views, are captured as events with parameters)",
          "Screen-resolution modeling",
          "Cookie-only tracking",
          "Keyword index logging"
        ],
        correctAnswer: 0,
        explanation: "GA4 is built entirely on an event-driven architecture where every hit (page_view, click, scroll, purchase) is treated uniformly as an event with accompanying parameters."
      },
      {
        id: 9,
        question: "What HTTP response status code indicates a permanent URL redirect that passes full link equity (PageRank)?",
        options: ["301 Moved Permanently", "302 Found (Temporary)", "404 Not Found", "503 Service Unavailable"],
        correctAnswer: 0,
        explanation: "A 301 redirect signals a permanent move, instructing search engines to transfer accumulated ranking equity and index the new target URL."
      },
      {
        id: 10,
        question: "What is 'A/B Testing' (Split Testing) in Conversion Rate Optimization (CRO)?",
        options: [
          "Testing two completely different websites on different domain names",
          "Comparing two versions of a webpage or ad (Version A vs Version B) simultaneously with split traffic to determine which produces higher conversion rates",
          "Running an ad campaign in morning vs night",
          "Comparing organic search traffic against social media traffic"
        ],
        correctAnswer: 1,
        explanation: "A/B testing serves Version A (control) and Version B (variant) randomly to equal visitor samples to measure statistical differences in conversion outcomes."
      },
      {
        id: 11,
        question: "What directive in a `robots.txt` file prevents all search engine web crawlers from indexing the `/admin/` directory?",
        options: [
          "Disallow: /admin/",
          "Block: /admin/",
          "Noindex: /admin/*",
          "Exclude: /admin/"
        ],
        correctAnswer: 0,
        explanation: "Under the `User-agent: *` header, `Disallow: /admin/` instructs compliant web robots not to crawl pages within that directory path."
      },
      {
        id: 12,
        question: "What is 'Lookalike Audience' in Meta Ads advertising?",
        options: [
          "An audience made up of friends who look like the business owner",
          "An algorithmically generated audience of new prospects who share similar behavioral, demographic, and interest characteristics with existing high-value customers",
          "An audience that has visited a competitor's profile page",
          "An audience restricted exclusively to Instagram verified accounts"
        ],
        correctAnswer: 1,
        explanation: "Meta Lookalike Audiences use machine learning to identify users across Facebook/Instagram whose online signals closely mirror a source seed audience (like past buyers)."
      },
      {
        id: 13,
        question: "What is a healthy LTV:CAC (Customer Lifetime Value to Customer Acquisition Cost) ratio for a sustainable SaaS business?",
        options: ["1:5 (CAC is 5 times LTV)", "3:1 or higher (LTV is at least 3 times CAC)", "0.5:1", "100:1 minimum"],
        correctAnswer: 1,
        explanation: "An LTV:CAC ratio of 3:1 is widely considered the SaaS benchmark: creating 3 times more value from a customer than it costs to acquire them, while maintaining profitability."
      },
      {
        id: 14,
        question: "Which email marketing metric measures the percentage of sent emails that could not be delivered due to permanent reasons like an invalid email address?",
        options: ["Soft Bounce Rate", "Hard Bounce Rate", "Unsubscribe Rate", "Spam Complaint Rate"],
        correctAnswer: 1,
        explanation: "A Hard Bounce is a permanent delivery failure caused by non-existent, invalid, or blocked email addresses, and hurts domain sender reputation if not cleaned."
      },
      {
        id: 15,
        question: "What does 'Search Intent' (User Intent) mean in modern SEO content strategy?",
        options: [
          "The speed at which a user types queries into the search bar",
          "The underlying goal or motivation a searcher has when typing a query (Informational, Navigational, Commercial, or Transactional)",
          "The language in which the user's browser is configured",
          "The number of ads clicked by the user in the past month"
        ],
        correctAnswer: 1,
        explanation: "Search intent categorizes why a user searches (e.g. to learn, to find a specific website, to research options, or to make an immediate purchase), driving content relevance."
      },
      {
        id: 16,
        question: "What is an XML Sitemap used for by search engine crawlers?",
        options: [
          "To provide visual styling for website visitors",
          "A structured roadmap file listing all critical URLs of a website, their update frequency, and priority to help search engine spiders crawl them efficiently",
          "To generate automatic meta description tags",
          "To store customer passwords securely"
        ],
        correctAnswer: 1,
        explanation: "XML Sitemaps inform search engine bots (Googlebot, Bingbot) about all discoverable pages, image assets, and last modification timestamps on a website."
      },
      {
        id: 17,
        question: "What does Click-Through Rate (CTR) measure in digital advertising?",
        options: [
          "(Total Clicks / Total Impressions) x 100",
          "(Total Conversions / Total Clicks) x 100",
          "(Total Ad Cost / Total Clicks)",
          "(Total Impressions / Total Conversions)"
        ],
        correctAnswer: 0,
        explanation: "CTR is the percentage of people who saw an ad (impressions) and clicked on it: (Clicks / Impressions) * 100."
      },
      {
        id: 18,
        question: "What is 'Attribution Modeling' in multi-channel digital marketing analytics?",
        options: [
          "Crediting authors of blog posts with proper copyright citations",
          "A framework that determines how credit for sales and conversions is assigned to various marketing touchpoints across a user's customer journey",
          "Measuring which designer created the best-performing banner ad",
          "Assigning IP addresses to customer accounts"
        ],
        correctAnswer: 1,
        explanation: "Attribution models (First Click, Last Click, Linear, Data-Driven) decide which marketing channels get credit along the multi-step path to conversion."
      },
      {
        id: 19,
        question: "In Google Ads, what happens if an ad group contains broad match keywords without negative keywords?",
        options: [
          "The campaign budget will automatically be refunded",
          "The ads will show for wide-ranging, loosely related, or irrelevant search queries, leading to wasted spend",
          "The Quality Score will automatically jump to 10/10",
          "Ads will only display to existing email subscribers"
        ],
        correctAnswer: 1,
        explanation: "Broad match triggers ads on related searches and variations; without negative keywords to filter unwanted queries, budget is quickly drained by irrelevant impressions."
      },
      {
        id: 20,
        question: "What email authentication protocol uses cryptographic public/private key pairs to verify that an email was indeed sent by the designated domain without tampering?",
        options: ["DKIM (DomainKeys Identified Mail)", "SSL/TLS", "FTP", "DNSSEC"],
        correctAnswer: 0,
        explanation: "DKIM attaches a digital signature to email headers linked to the sender domain's DNS public key, proving email authenticity and boosting deliverability."
      },
      {
        id: 21,
        question: "What is the recommended title tag length in SEO to ensure proper display on Google Search SERPs without truncation?",
        options: ["Under 20 characters", "50 to 60 characters (or ~580 pixels)", "150 to 200 characters", "Over 500 characters"],
        correctAnswer: 1,
        explanation: "Google typically displays the first 50-60 characters (approx. 580-600 pixels) of a title tag; longer titles are truncated with ellipses (...)."
      },
      {
        id: 22,
        question: "What is 'Dwell Time' in organic search user behavior?",
        options: [
          "The duration a server takes to restart after maintenance",
          "The length of time a user spends on a webpage after clicking a search result before returning to the SERP (pogo-sticking)",
          "The expiration period of a tracking cookie",
          "The time an advertiser spends drafting ad copy"
        ],
        correctAnswer: 1,
        explanation: "Dwell time measures how long a searcher stays on a page after clicking a Google result before heading back to the search results, reflecting content satisfaction."
      },
      {
        id: 23,
        question: "What is the primary role of a 'Retargeting' (Remarketing) advertising campaign?",
        options: [
          "Showing ads exclusively to people in another country",
          "Serving targeted ads to users who have previously visited your website or engaged with your brand but did not convert",
          "Targeting employees of rival corporations",
          "Advertising exclusively on traditional billboards"
        ],
        correctAnswer: 1,
        explanation: "Retargeting uses cookie or server-side audience lists to re-engage warm prospects who demonstrated previous interest but abandoned the funnel."
      },
      {
        id: 24,
        question: "What is the purpose of Schema Markup (Structured Data) using JSON-LD on a website?",
        options: [
          "To speed up CSS animations on mobile devices",
          "To provide explicit semantic clues to search engines about page content, enabling rich snippets (star ratings, FAQs, event cards) in search results",
          "To prevent users from copying text from the site",
          "To compress JPEG images on the server"
        ],
        correctAnswer: 1,
        explanation: "Schema.org structured data (JSON-LD) explicitly labels page entities for search engines, qualifying pages for eye-catching rich snippets on SERPs."
      },
      {
        id: 25,
        question: "In performance marketing, what is 'Ad Fatigue'?",
        options: [
          "When digital marketers get physically tired from managing campaigns",
          "When an audience sees the same ad too many times (high frequency), causing CTR to decline and Cost Per Acquisition (CPA) to rise",
          "When the Google Ads server runs out of memory",
          "When email spam filters crash"
        ],
        correctAnswer: 1,
        explanation: "Ad Fatigue happens when high frequency leads to audience boredom and blindness to the creative, leading to dropping engagement and higher costs."
      },
      {
        id: 26,
        question: "What does 'E-E-A-T' stand for in Google's Search Quality Rater Guidelines?",
        options: [
          "Experience, Expertise, Authoritativeness, Trustworthiness",
          "Efficiency, Effectiveness, Accessibility, Technology",
          "Engagement, Exposure, Analytics, Traffic",
          "Execution, Evaluation, Audit, Tactics"
        ],
        correctAnswer: 0,
        explanation: "E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) is Google's human evaluation framework for judging the reliability and quality of web content."
      },
      {
        id: 27,
        question: "What does a negative keyword do in a Google Search advertising campaign?",
        options: [
          "Lowers your bid by 50% automatically",
          "Prevents your ad from being triggered by certain search terms or phrases containing that word",
          "Deletes the ad campaign permanently",
          "Flags competitor ads as spam"
        ],
        correctAnswer: 1,
        explanation: "Negative keywords (e.g. 'free', 'jobs') stop your ads from showing on irrelevant queries, saving budget for qualified commercial intent."
      },
      {
        id: 28,
        question: "What is the formula to calculate Conversion Rate on a landing page?",
        options: [
          "(Total Conversions / Total Unique Visitors or Sessions) x 100",
          "(Total Bounce Count / Total Clicks) x 100",
          "(Revenue / Ad Spend) x 100",
          "(Total Impressions / Total Pageviews)"
        ],
        correctAnswer: 0,
        explanation: "Conversion Rate = (Conversions / Total Visitors) * 100. For example, 50 leads from 1,000 visitors is a 5% conversion rate."
      },
      {
        id: 29,
        question: "Which email metric measures how many recipients marked an incoming email as junk or spam?",
        options: ["Open Rate", "Spam Complaint Rate (which should be kept strictly below 0.1%)", "Unsubscribe Velocity", "Delivery Ratio"],
        correctAnswer: 1,
        explanation: "Google and Yahoo mandate that domain spam complaint rates remain under 0.10% (and never exceed 0.30%) to avoid being blocked from user inboxes."
      },
      {
        id: 30,
        question: "In SEO, what is an 'Orphan Page'?",
        options: [
          "A page that has no incoming internal links from any other page on the same website",
          "A page that has been deleted from the database",
          "A page without an author photo",
          "A page that does not rank in the top 100 of Google"
        ],
        correctAnswer: 0,
        explanation: "An orphan page has zero internal links pointing to it, making it nearly impossible for search engine crawlers and users to discover through site navigation."
      }
    ]
  },

  // =========================================================================
  // 7. CYBER SECURITY (30 QUESTIONS)
  // =========================================================================
  {
    id: "cyber-security",
    name: "Cyber Security & Information Assurance",
    shortTitle: "Cyber Security",
    category: "Security & Systems",
    icon: "ShieldCheck",
    gradient: "from-red-600/20 via-orange-500/10 to-amber-600/20",
    badgeColor: "bg-red-500/20 text-red-300 border-red-500/30",
    description: "Evaluate core infosec knowledge: CIA Triad, symmetric vs asymmetric encryption, zero-trust architecture, network defense, and OWASP Top 10 vulnerabilities.",
    syllabus: [
      "CIA Triad (Confidentiality, Integrity, Availability) & Risk Management",
      "Cryptography: AES, RSA, Hashing (SHA-256) & Digital Signatures",
      "OWASP Top 10: SQLi, XSS, CSRF, SSRF & Broken Access Control",
      "Network Security: Firewalls, IDS/IPS, VPNs & DDoS Mitigation",
      "Zero-Trust Architecture, IAM, MFA & Incident Response"
    ],
    passingScore: 18.0,
    totalQuestions: 30,
    timeLimitMinutes: 30,
    questions: [
      {
        id: 1,
        question: "What are the three core pillars of the foundational 'CIA Triad' in information security?",
        options: [
          "Control, Inspection, Authentication",
          "Confidentiality, Integrity, Availability",
          "Cryptography, Identity, Authorization",
          "Compliance, Incident, Audit"
        ],
        correctAnswer: 1,
        explanation: "The CIA Triad comprises Confidentiality (privacy of data), Integrity (ensuring data is unaltered), and Availability (ensuring systems are accessible when needed)."
      },
      {
        id: 2,
        question: "What is the primary operational difference between Symmetric and Asymmetric encryption?",
        options: [
          "Symmetric encryption uses the same shared secret key for encryption and decryption; Asymmetric uses a mathematically paired public key and private key",
          "Symmetric encryption is only used for audio files; Asymmetric is used for text",
          "Asymmetric encryption is 1,000 times faster than symmetric encryption",
          "Symmetric encryption cannot be broken by quantum computers"
        ],
        correctAnswer: 0,
        explanation: "Symmetric algorithms (like AES) use one identical key for both processes. Asymmetric algorithms (like RSA, ECC) use a public key for encryption and a private key for decryption."
      },
      {
        id: 3,
        question: "What fundamental mathematical property distinguishes a Cryptographic Hash function (such as SHA-256) from Encryption?",
        options: [
          "Hashing is one-way (irreversible); encrypted data can be decrypted back to plaintext using the appropriate key",
          "Hashing produces variable-length outputs depending on file size",
          "Encryption is free, whereas hashing requires a software license",
          "Hashes can easily be decrypted by running the algorithm in reverse"
        ],
        correctAnswer: 0,
        explanation: "Hashing is a deterministic one-way function designed to verify data integrity; it cannot be reversed to plaintext. Encryption is a two-way function designed for confidential decryption."
      },
      {
        id: 4,
        question: "What vulnerability occurs when an application includes unsanitized user-supplied data in an operating system command or database query?",
        options: [
          "Injection (e.g., SQL Injection, OS Command Injection)",
          "Buffer Overflow",
          "Cross-Site Request Forgery (CSRF)",
          "Denial of Service (DoS)"
        ],
        correctAnswer: 0,
        explanation: "Injection vulnerabilities (ranked #3 on OWASP Top 10) occur when hostile input is sent to an interpreter as part of a command or query, altering intended program execution."
      },
      {
        id: 5,
        question: "How do Parameterized Queries (Prepared Statements) prevent SQL Injection attacks?",
        options: [
          "By encrypting the entire SQL database on disk",
          "By strictly separating SQL code structure from user data parameters, preventing input from being executed as code",
          "By shutting down the web server if a quotation mark is entered",
          "By running queries only through a VPN"
        ],
        correctAnswer: 1,
        explanation: "Prepared statements pre-compile the SQL execution plan and treat user input strictly as literal parameter data, ensuring input can never alter query logic."
      },
      {
        id: 6,
        question: "What is the difference between Stored Cross-Site Scripting (XSS) and Reflected XSS?",
        options: [
          "Stored XSS permanently saves the malicious payload in the application database; Reflected XSS immediately bounces the payload off the web server in the current HTTP response",
          "Stored XSS only affects mobile phones",
          "Reflected XSS can only be executed by internal system administrators",
          "There is no practical difference between the two"
        ],
        correctAnswer: 0,
        explanation: "Stored XSS embeds malicious scripts into persistent storage (comments, profiles) where every visitor is infected. Reflected XSS requires tricking a victim into clicking a link with the payload reflected in the immediate response."
      },
      {
        id: 7,
        question: "What is the core philosophy of 'Zero Trust' network architecture?",
        options: [
          "Never trust employees who have worked less than 1 year",
          "'Never Trust, Always Verify' — assuming breach and requiring strict continuous identity verification and least-privilege access for all users and devices, regardless of whether they are inside or outside the network perimeter",
          "Blocking all external internet access to all computers in the company",
          "Trusting everyone inside the corporate office LAN automatically"
        ],
        correctAnswer: 1,
        explanation: "Zero Trust removes implicit trust based on network location. Every access request must be authenticated, authorized, and continuously validated."
      },
      {
        id: 8,
        question: "What type of attack involves overwhelming a target web server or network with a massive flood of distributed traffic from a botnet to cause outage?",
        options: [
          "Distributed Denial of Service (DDoS)",
          "Man-in-the-Middle (MitM)",
          "Cross-Site Scripting (XSS)",
          "Phishing"
        ],
        correctAnswer: 0,
        explanation: "A DDoS attack leverages thousands of compromised internet-connected devices (botnets) to flood network bandwidth or server compute resources, rendering services unavailable."
      },
      {
        id: 9,
        question: "What does Multi-Factor Authentication (MFA) require to successfully authenticate a user?",
        options: [
          "Two different passwords",
          "Evidence from at least two distinct authentication categories: Something you know (password), Something you have (authenticator app/hardware token), or Something you are (biometrics)",
          "Entering a username twice",
          "A password plus a secret question"
        ],
        correctAnswer: 1,
        explanation: "True MFA mandates verification across at least two different factor types: Knowledge (password/PIN), Possession (token/app), or Inherence (fingerprint/face)."
      },
      {
        id: 10,
        question: "What is a 'Man-in-the-Middle' (MitM) attack?",
        options: [
          "An attacker physically standing between two server racks",
          "An attacker secretly intercepting and potentially altering communications between two parties who believe they are communicating directly with each other",
          "A software glitch in router firmware",
          "A computer virus that attacks middle managers"
        ],
        correctAnswer: 1,
        explanation: "In an MitM attack (e.g. through ARP spoofing or rogue Wi-Fi access points), the attacker intercepts, reads, and potentially modifies traffic passing between victim and destination."
      },
      {
        id: 11,
        question: "What security mechanism protects sensitive session cookies from being accessed by client-side JavaScript scripts?",
        options: ["The `HttpOnly` flag", "The `Secure` flag", "The `SameSite=Lax` attribute", "CORS headers"],
        correctAnswer: 0,
        explanation: "Setting the `HttpOnly` flag on a cookie prevents client-side scripts (via `document.cookie`) from reading it, mitigating session hijacking via XSS attacks."
      },
      {
        id: 12,
        question: "What is the difference between a Network Firewall and an Intrusion Detection System (IDS)?",
        options: [
          "A firewall blocks or allows traffic based on predefined packet rules (IPs, ports); an IDS monitors, inspects, and analyzes network traffic patterns to alert on suspicious attack signatures or anomalies",
          "Firewalls only work on Windows; IDS only works on Linux",
          "An IDS can only block physical USB drives",
          "They are identical terms for anti-virus software"
        ],
        correctAnswer: 0,
        explanation: "Firewalls filter incoming/outgoing traffic based on state and ports. An IDS inspects packet payloads and behaviors to detect active intrusion attempts and anomalies."
      },
      {
        id: 13,
        question: "What is 'Salting' in the context of password hashing?",
        options: [
          "Adding random unique cryptographic strings to each password before hashing to defeat precomputed Rainbow Table attacks",
          "Encrypting passwords with a physical hardware key",
          "Deleting passwords after 90 days",
          "Converting passwords into uppercase characters"
        ],
        correctAnswer: 0,
        explanation: "Salting appends unique random data to each plaintext password prior to hashing, ensuring identical passwords generate completely different hashes and neutralizing rainbow table lookups."
      },
      {
        id: 14,
        question: "What is a 'Zero-Day Vulnerability'?",
        options: [
          "A flaw that takes zero seconds to exploit",
          "A software security flaw that is unknown to the vendor or for which no official security patch currently exists",
          "A vulnerability that expires in 24 hours",
          "A vulnerability that causes zero business damage"
        ],
        correctAnswer: 1,
        explanation: "A Zero-Day is a vulnerability discovered and exploited before the software vendor is aware or has had 'zero days' to issue a corrective security patch."
      },
      {
        id: 15,
        question: "What is Cross-Site Request Forgery (CSRF)?",
        options: [
          "An attack where a malicious website tricks a victim's authenticated browser into executing unwanted actions on a trusted web application without their knowledge",
          "Stealing a computer's physical hard drive",
          "Guessing an administrator's password using brute force",
          "Flooding an email inbox with spam"
        ],
        correctAnswer: 0,
        explanation: "CSRF exploits the browser's automatic inclusion of credentials (cookies) to execute unauthorized state-changing requests (like money transfers) on behalf of a logged-in victim."
      },
      {
        id: 16,
        question: "What HTTP response header restricts the sources of scripts, images, and styles that a browser is permitted to execute, dramatically mitigating XSS?",
        options: [
          "Content-Security-Policy (CSP)",
          "X-Frame-Options",
          "Strict-Transport-Security (HSTS)",
          "Access-Control-Allow-Origin"
        ],
        correctAnswer: 0,
        explanation: "Content-Security-Policy (CSP) specifies approved whitelists of content sources, blocking unauthorized inline scripts and unauthorized cross-domain data transmission."
      },
      {
        id: 17,
        question: "What does the Principle of Least Privilege (PoLP) dictate in access control?",
        options: [
          "Every employee should have administrator rights to work faster",
          "Users and systems should be granted only the minimum necessary permissions required to perform their specific job functions and nothing more",
          "Privileges should be granted for only 1 hour per day",
          "Executives should never be audited"
        ],
        correctAnswer: 1,
        explanation: "Least Privilege restricts user and system access rights to only what is strictly necessary to complete assigned tasks, minimizing the blast radius of any compromise."
      },
      {
        id: 18,
        question: "What type of malware encrypts a victim's files and demands payment in cryptocurrency in exchange for the decryption key?",
        options: ["Ransomware", "Spyware", "Adware", "Rootkit"],
        correctAnswer: 0,
        explanation: "Ransomware uses strong encryption to lock organization data and backups, extorting financial ransom payments under threat of permanent data loss or public exposure."
      },
      {
        id: 19,
        question: "What is the purpose of HTTP Strict Transport Security (HSTS)?",
        options: [
          "Forces browsers to communicate with the website exclusively over secure HTTPS connections, preventing SSL-stripping attacks",
          "Blocks users from accessing social media during work hours",
          "Compresses website images to reduce bandwidth",
          "Scans web traffic for pirated movies"
        ],
        correctAnswer: 0,
        explanation: "The HSTS header forces modern browsers to communicate only over HTTPS, preventing downgrade/SSL-stripping attacks on insecure HTTP links."
      },
      {
        id: 20,
        question: "What does a Security Operations Center (SOC) 'SIEM' system do?",
        options: [
          "Manages customer support phone calls",
          "Security Information and Event Management: aggregates, correlates, and analyzes security logs and alerts across an organization in real time",
          "Designs hardware network cables",
          "Audits employee tax returns"
        ],
        correctAnswer: 1,
        explanation: "SIEM (Security Information and Event Management) platforms ingest log telemetry from servers, endpoints, and firewalls to correlate indicators of compromise and alert security analysts."
      },
      {
        id: 21,
        question: "What is 'Spear Phishing' compared to standard Phishing?",
        options: [
          "Phishing that attacks maritime shipping companies",
          "A highly tailored, customized phishing attack aimed at a specific individual or organization using personal background research to increase credibility",
          "Mass automated spam sent to 10 million random email addresses",
          "Phishing performed via SMS text messages only"
        ],
        correctAnswer: 1,
        explanation: "Spear phishing uses reconnaissance and targeted social engineering against a specific high-profile individual, making the deception far more convincing than generic bulk spam."
      },
      {
        id: 22,
        question: "What is the primary role of a Public Key Infrastructure (PKI) Certificate Authority (CA)?",
        options: [
          "To issue and cryptographically sign digital certificates that bind public keys to identities, establishing trust in TLS/HTTPS",
          "To sell domain names on the open market",
          "To monitor employee internet browsing history",
          "To block copyright infringement on YouTube"
        ],
        correctAnswer: 0,
        explanation: "A Certificate Authority acts as a trusted third party verifying identities and signing X.509 digital certificates for secure web traffic."
      },
      {
        id: 23,
        question: "What vulnerability occurs when an application receives a URL from an attacker and fetches remote resources on behalf of the attacker, exposing internal services?",
        options: [
          "Server-Side Request Forgery (SSRF)",
          "Clickjacking",
          "Cross-Site Scripting (XSS)",
          "Directory Traversal"
        ],
        correctAnswer: 0,
        explanation: "SSRF (Server-Side Request Forgery) tricks the vulnerable backend server into making unauthorized HTTP requests to internal resources (like cloud metadata endpoints 169.254.169.254)."
      },
      {
        id: 24,
        question: "What is 'Penetration Testing' (Ethical Hacking)?",
        options: [
          "An authorized simulated cyberattack against an organization's systems to identify exploitable security vulnerabilities before malicious hackers find them",
          "Physically drilling holes into old servers to destroy hard drives",
          "Testing internet bandwidth capacity during peak hours",
          "Installing unlicensed commercial software"
        ],
        correctAnswer: 0,
        explanation: "Penetration testing is a sanctioned, controlled assessment where security professionals use adversary techniques to expose security weaknesses."
      },
      {
        id: 25,
        question: "What is a 'Buffer Overflow' vulnerability?",
        options: [
          "When an email inbox exceeds 10 GB of storage",
          "When a program writes more data to a fixed-size memory block (buffer) than it was allocated, overwriting adjacent memory and potentially hijacking program execution flow",
          "When too many people connect to an office Wi-Fi router",
          "When a database query runs out of temporary table space"
        ],
        correctAnswer: 1,
        explanation: "In lower-level languages like C/C++, failing to enforce memory bounds allows excess input to overflow into adjacent memory addresses, overwriting return pointers."
      },
      {
        id: 26,
        question: "What is an Air-Gapped system in cyber defense?",
        options: [
          "A computer system physically isolated from any external network, local area network, or internet connection",
          "A server room equipped with high-powered air conditioning",
          "A cloud server hosted on an airplane",
          "A wireless network that operates without cables"
        ],
        correctAnswer: 0,
        explanation: "Air-gapping is the practice of completely isolating critical computers (like nuclear or industrial SCADA control systems) from all physical and wireless network links."
      },
      {
        id: 27,
        question: "What is 'Social Engineering' in information security?",
        options: [
          "Building mobile social media applications",
          "Psychological manipulation of people into performing actions or divulging confidential credentials and sensitive information",
          "Organizing company team-building events",
          "Auditing human resources hiring records"
        ],
        correctAnswer: 1,
        explanation: "Social engineering targets human vulnerabilities (trust, urgency, fear) via pretexting, phishing, and impersonation rather than exploiting technical software bugs."
      },
      {
        id: 28,
        question: "What does the `SameSite` attribute on HTTP cookies do when set to `Strict`?",
        options: [
          "Prevents the cookie from ever being sent in cross-site requests, providing strong defense against CSRF attacks",
          "Deletes the cookie after 60 seconds",
          "Encrypts the cookie with military-grade algorithms",
          "Allows the cookie to be read by any website on the internet"
        ],
        correctAnswer: 0,
        explanation: "`SameSite=Strict` ensures the cookie is never sent on cross-site browsing requests (like clicking a link from an external site), defeating most CSRF attacks."
      },
      {
        id: 29,
        question: "What is a Honeypot in cyber security?",
        options: [
          "A trap system or decoy server intentionally set up with known vulnerabilities to lure, detect, and study attackers' tactics",
          "A password manager used by executives",
          "A high-speed fiber optic connection",
          "An encrypted USB drive distributed to staff"
        ],
        correctAnswer: 0,
        explanation: "A honeypot is an isolated decoy asset designed to attract attackers, triggering alarms and allowing defenders to gather threat intelligence without risk to production."
      },
      {
        id: 30,
        question: "What is 'Defense in Depth' (Layered Security)?",
        options: [
          "Digging physical trenches around data centers",
          "Employing multiple redundant layers of security defenses (firewalls, EDR, MFA, least privilege, encryption) so if one layer fails, others stop the breach",
          "Installing five different anti-virus programs on the same laptop",
          "Relying entirely on a strong perimeter firewall"
        ],
        correctAnswer: 1,
        explanation: "Defense in Depth assumes individual safeguards can fail, implementing concentric defensive layers (physical, perimeter, network, host, application, data) to protect assets."
      }
    ]
  },

  // =========================================================================
  // 8. CLOUD COMPUTING (30 QUESTIONS)
  // =========================================================================
  {
    id: "cloud-computing",
    name: "Cloud Computing (AWS, Azure & Architecture)",
    shortTitle: "Cloud Computing",
    category: "Infrastructure & DevOps",
    icon: "Cloud",
    gradient: "from-sky-500/20 via-blue-500/10 to-indigo-600/20",
    badgeColor: "bg-sky-500/20 text-sky-300 border-sky-500/30",
    description: "Validate core cloud architecture: AWS/Azure services, IaaS vs PaaS vs SaaS, high availability, auto-scaling, VPC networking, and cloud security.",
    syllabus: [
      "Cloud Service Models: IaaS, PaaS, SaaS & Shared Responsibility",
      "Compute: AWS EC2, Lambda, Azure VMs & Serverless functions",
      "Storage: S3 Bucket Policies, EBS vs EFS, Azure Blob & Lifecycle",
      "Networking: VPC, Subnets, Route Tables, NAT Gateways & Security Groups",
      "High Availability, Disaster Recovery (RTO/RPO) & Auto-Scaling"
    ],
    passingScore: 18.0,
    totalQuestions: 30,
    timeLimitMinutes: 30,
    questions: [
      {
        id: 1,
        question: "Under the Cloud 'Shared Responsibility Model', who is responsible for OS patching and network configuration of an IaaS virtual machine (such as AWS EC2)?",
        options: [
          "The Cloud Service Provider entirely (AWS/Azure)",
          "The Customer",
          "A third-party hardware vendor",
          "Neither party patches virtual machines"
        ],
        correctAnswer: 1,
        explanation: "In Infrastructure-as-a-Service (IaaS), the cloud provider manages physical hardware, facilities, and hypervisors. The customer is strictly responsible for guest OS, patches, firewall rules, and data."
      },
      {
        id: 2,
        question: "What is the primary difference between IaaS (Infrastructure as a Service) and PaaS (Platform as a Service)?",
        options: [
          "In IaaS, the customer manages the operating system and runtime; in PaaS, the cloud provider manages the underlying OS and runtime, allowing developers to focus solely on application code",
          "IaaS is only used for data storage; PaaS is used for gaming",
          "PaaS requires buying physical server racks",
          "There is no difference between the two"
        ],
        correctAnswer: 0,
        explanation: "PaaS (like AWS Elastic Beanstalk or Azure App Service) abstracts server management, OS patching, and runtime configuration, letting developers deploy code directly."
      },
      {
        id: 3,
        question: "What are AWS 'Availability Zones' (AZs)?",
        options: [
          "Software updates released once per year",
          "Distinct physical data centers located within a geographic region, engineered to be isolated from failures in other AZs with redundant power and networking",
          "Time zones used for billing customer invoices",
          "Government-approved compliance boundaries"
        ],
        correctAnswer: 1,
        explanation: "An AWS Region consists of multiple isolated Availability Zones connected with low-latency private fiber. Designing across multiple AZs provides high availability against data center outages."
      },
      {
        id: 4,
        question: "What AWS service provides scalable object storage accessible over the internet via HTTP REST APIs?",
        options: ["Amazon EBS (Elastic Block Store)", "Amazon S3 (Simple Storage Service)", "Amazon EFS (Elastic File System)", "Amazon RDS"],
        correctAnswer: 1,
        explanation: "Amazon S3 is a highly durable (99.999999999% durability), scalable object storage service designed to store unstructured data like images, backups, and web assets."
      },
      {
        id: 5,
        question: "What is the key difference between Amazon EBS (Elastic Block Store) and Amazon S3?",
        options: [
          "EBS is block-level storage designed to attach directly to a specific EC2 instance as a high-speed system/data drive; S3 is object storage accessible via web APIs",
          "EBS is free, whereas S3 is extremely expensive",
          "S3 cannot store more than 1 megabyte of data",
          "EBS is only available on Apple computers"
        ],
        correctAnswer: 0,
        explanation: "EBS acts like a virtual hard disk drive attached directly to an EC2 instance for OS and database operations. S3 is internet-accessible object storage."
      },
      {
        id: 6,
        question: "What AWS networking component enables EC2 instances in a private subnet to initiate outbound internet connections (for updates) while blocking inbound internet traffic?",
        options: ["Internet Gateway (IGW)", "NAT Gateway (Network Address Translation)", "Virtual Private Gateway", "VPC Peering Connection"],
        correctAnswer: 1,
        explanation: "A NAT Gateway in a public subnet allows private subnet resources to reach external web servers for software updates while preventing unauthorized inbound access from the internet."
      },
      {
        id: 7,
        question: "What is the primary characteristic of 'Serverless' compute architectures like AWS Lambda or Azure Functions?",
        options: [
          "Computations run without physical hardware anywhere on earth",
          "Developers deploy code functions that execute on-demand in response to events; billing occurs strictly per millisecond of compute time used, with zero idle server costs",
          "Applications never crash and have unlimited execution timeouts",
          "You must manage the Linux operating system manually"
        ],
        correctAnswer: 1,
        explanation: "Serverless abstracts server provisioning, automatically scales from 0 to thousands of concurrent executions, and bills only for actual execution duration."
      },
      {
        id: 8,
        question: "What is the key difference between a Security Group and a Network Access Control List (NACL) in an AWS VPC?",
        options: [
          "Security Groups are stateful firewalls applied at the EC2 instance/ENI level; NACLs are stateless firewalls applied at the subnet boundary level",
          "Security Groups can only block traffic; NACLs can only allow traffic",
          "NACLs are stateful; Security Groups are stateless",
          "Security Groups are paid add-ons, while NACLs are free"
        ],
        correctAnswer: 0,
        explanation: "Security Groups are stateful (inbound allowed traffic automatically permits return outbound traffic) at the instance level. NACLs are stateless (rules evaluated in order) at the subnet level."
      },
      {
        id: 9,
        question: "What does RPO (Recovery Point Objective) measure in disaster recovery planning?",
        options: [
          "The maximum acceptable amount of data loss measured in time between the disaster and the latest backup",
          "The time taken to restore services after a server crash",
          "The total financial cost of a hardware failure",
          "The speed of an internet connection"
        ],
        correctAnswer: 0,
        explanation: "RPO defines the maximum tolerable age of files that must be recovered from backup storage for normal operations to resume (how much data loss is acceptable in minutes/hours)."
      },
      {
        id: 10,
        question: "What does RTO (Recovery Time Objective) define in disaster recovery?",
        options: [
          "The maximum acceptable duration of system downtime from incident occurrence until service is restored",
          "The time required to purchase a new server from Dell",
          "The return on investment of a cloud migration",
          "The bandwidth required to sync two databases"
        ],
        correctAnswer: 0,
        explanation: "RTO is the targeted duration of time within which a business process or application must be restored after a service interruption to avoid severe losses."
      },
      {
        id: 11,
        question: "Which AWS service distributes incoming application traffic automatically across multiple targets (such as EC2 instances or containers) across multiple AZs?",
        options: ["Elastic Load Balancing (ELB)", "AWS Route 53", "AWS Direct Connect", "Amazon CloudFront"],
        correctAnswer: 0,
        explanation: "Elastic Load Balancing (Application Load Balancer / Network Load Balancer) distributes incoming HTTP/TCP requests across healthy compute targets for resilience."
      },
      {
        id: 12,
        question: "What is the purpose of an Auto Scaling Group (ASG) in cloud architecture?",
        options: [
          "To dynamically add or remove compute instances based on demand metrics (such as CPU utilization) to maintain performance while minimizing costs",
          "To resize the browser window automatically",
          "To upgrade database storage capacity without user permission",
          "To change pricing tiers based on currency fluctuations"
        ],
        correctAnswer: 0,
        explanation: "Auto Scaling maintains application availability by automatically provisioning new compute instances when demand peaks and decommissioning excess instances when demand drops."
      },
      {
        id: 13,
        question: "What AWS service acts as a global Content Delivery Network (CDN) to deliver content with low latency using edge locations?",
        options: ["Amazon CloudFront", "AWS Transit Gateway", "Amazon S3 Glacier", "AWS WAF"],
        correctAnswer: 0,
        explanation: "Amazon CloudFront caches static and dynamic web content at hundreds of Points of Presence (Edge Locations) worldwide, serving users with minimal latency."
      },
      {
        id: 14,
        question: "What does 'Elasticity' mean in cloud computing?",
        options: [
          "The ability of cloud infrastructure to dynamically adapt capacity by provisioning and de-provisioning resources automatically to match fluctuating real-time workloads",
          "Physical flexibility of Ethernet cables in data centers",
          "The ability to sign multi-year contracts with discounts",
          "The capability of a database to store different languages"
        ],
        correctAnswer: 0,
        explanation: "Elasticity is the system's ability to seamlessly scale resources up and down in direct proportion to fluctuating demand, preventing over-provisioning and capacity shortages."
      },
      {
        id: 15,
        question: "In AWS Identity and Access Management (IAM), what is the best practice recommendation for the root user account?",
        options: [
          "Use the root user for all everyday administrative tasks",
          "Lock away the root credentials, enable hardware MFA, and create individual IAM users or federated roles with least privilege for daily administration",
          "Share the root password with all software engineers",
          "Disable MFA on the root account to prevent lockouts"
        ],
        correctAnswer: 1,
        explanation: "AWS security best practices mandate locking down the root account with strong MFA, never using it for routine tasks, and delegating permissions via role-based IAM."
      },
      {
        id: 16,
        question: "What is an IAM 'Role' in AWS compared to an IAM 'User'?",
        options: [
          "A role does not have long-term credentials (passwords/access keys); it provides temporary security credentials assumed by trusted entities, services, or applications",
          "A role is used only by human interns",
          "A user can never have administrative access, but a role can",
          "Roles are billed hourly by AWS"
        ],
        correctAnswer: 0,
        explanation: "IAM roles provide temporary short-lived credentials via AWS STS, allowing services like EC2 or Lambda to interact with AWS resources securely without hardcoded keys."
      },
      {
        id: 17,
        question: "What is Infrastructure as Code (IaC)?",
        options: [
          "Writing code by hand on physical servers",
          "Managing and provisioning computing infrastructure through machine-readable definition files (e.g. Terraform, AWS CloudFormation) rather than manual console configuration",
          "Using AI to build physical computer chips",
          "Writing documentation in Microsoft Word"
        ],
        correctAnswer: 1,
        explanation: "IaC (Terraform, AWS CDK, CloudFormation) treats infrastructure configurations as version-controlled code, ensuring repeatable, automated, and auditable cloud deployments."
      },
      {
        id: 18,
        question: "Which AWS managed relational database engine offers high performance and MySQL/PostgreSQL compatibility with distributed, fault-tolerant storage?",
        options: ["Amazon DynamoDB", "Amazon Aurora", "Amazon Redshift", "Amazon Neptune"],
        correctAnswer: 1,
        explanation: "Amazon Aurora is a cloud-native relational database service with 6-way replication across 3 AZs, delivering up to 5x the throughput of standard MySQL."
      },
      {
        id: 19,
        question: "What is Amazon DynamoDB?",
        options: [
          "A fully managed, serverless, key-value and document NoSQL database designed for single-digit millisecond performance at any scale",
          "A relational database that requires manual sharding",
          "A data warehouse for financial reporting",
          "An email delivery platform"
        ],
        correctAnswer: 0,
        explanation: "DynamoDB is AWS's proprietary managed NoSQL database offering horizontal auto-partitioning and predictable single-digit millisecond latency at massive scale."
      },
      {
        id: 20,
        question: "What is the purpose of S3 Storage Lifecycle Policies?",
        options: [
          "To automatically transition objects between storage classes (e.g. S3 Standard -> S3 Glacier) or expire/delete them after specified time intervals to optimize costs",
          "To format hard drives on a monthly basis",
          "To renew AWS account subscriptions automatically",
          "To encrypt files before they are downloaded"
        ],
        correctAnswer: 0,
        explanation: "Lifecycle rules automate tiering of aging files into cheaper archival tiers (like Glacier Flexible or Deep Archive) or schedule deletion, slashing storage spend."
      },
      {
        id: 21,
        question: "What is the maximum execution duration for an individual AWS Lambda function invocation?",
        options: ["30 seconds", "15 minutes (900 seconds)", "1 hour", "Unlimited"],
        correctAnswer: 1,
        explanation: "AWS Lambda enforces a hard execution ceiling of 15 minutes per invocation. Workloads requiring longer runtime must use container services (ECS/Fargate) or batch computing."
      },
      {
        id: 22,
        question: "What is a 'VPC Peering' connection?",
        options: [
          "A networking link between two Virtual Private Clouds (VPCs) allowing them to route traffic directly using private IPv4/IPv6 addresses without traversing the public internet",
          "Connecting a webcam to a cloud server",
          "Sharing an AWS account with a friend",
          "A high-speed fiber connection to an on-premise office"
        ],
        correctAnswer: 0,
        explanation: "VPC Peering allows two VPCs to communicate privately and securely across AWS's internal network backbone without gateways, VPNs, or public IP exposure."
      },
      {
        id: 23,
        question: "Which Azure service is the direct equivalent of AWS EC2 for provisioning on-demand virtual machines?",
        options: ["Azure Virtual Machines", "Azure Blob Storage", "Azure Logic Apps", "Azure Cosmos DB"],
        correctAnswer: 0,
        explanation: "Azure Virtual Machines (VMs) provide on-demand IaaS compute capacity, serving the equivalent function to AWS EC2."
      },
      {
        id: 24,
        question: "What is Microsoft Azure's globally distributed, multi-model NoSQL database service?",
        options: ["Azure Cosmos DB", "Azure SQL Database", "Azure Synapse", "Azure Data Lake"],
        correctAnswer: 0,
        explanation: "Azure Cosmos DB is a globally distributed, multi-model database service supporting document, key-value, graph, and column-family data with SLA-backed latencies."
      },
      {
        id: 25,
        question: "What is the function of AWS CloudTrail?",
        options: [
          "To record, log, and retain account activity and API calls across your AWS infrastructure for governance, compliance, and security auditing",
          "To calculate monthly server electric bills",
          "To track cloud cover weather patterns",
          "To optimize Python code syntax"
        ],
        correctAnswer: 0,
        explanation: "AWS CloudTrail tracks and logs every administrative and API action made across an AWS account (who made the request, when, and from what IP address)."
      },
      {
        id: 26,
        question: "What does Amazon CloudWatch provide in an AWS environment?",
        options: [
          "Monitoring and observability service that collects metrics, monitors logs, sets visual alarms, and triggers automated scaling actions",
          "A wristwatch sold in Amazon stores",
          "A tool for watching video streams online",
          "A hardware time server"
        ],
        correctAnswer: 0,
        explanation: "CloudWatch collects metrics (CPU, disk I/O, network), aggregates log files, and triggers alarms or auto-scaling events when thresholds are breached."
      },
      {
        id: 27,
        question: "What is the difference between AWS ECS (Elastic Container Service) and AWS EKS (Elastic Kubernetes Service)?",
        options: [
          "ECS is AWS's proprietary, streamlined container orchestrator; EKS is a managed standard Kubernetes control plane service",
          "ECS is only for Windows; EKS is only for Android",
          "EKS cannot run Docker containers",
          "ECS requires buying physical servers"
        ],
        correctAnswer: 0,
        explanation: "AWS ECS provides a simplified, highly integrated native container orchestrator. EKS provides managed upstream Kubernetes for organizations with standard k8s deployments."
      },
      {
        id: 28,
        question: "What does AWS Fargate do for containerized workloads?",
        options: [
          "It is a serverless compute engine for containers that runs ECS/EKS containers without requiring developers to manage or patch underlying EC2 host servers",
          "It converts Docker files into Python scripts",
          "It connects containers to satellite dishes",
          "It backs up containers to CD-ROMs"
        ],
        correctAnswer: 0,
        explanation: "Fargate allows you to run containers serverlessly: you specify CPU and memory requirements for your containers, and AWS manages the host infrastructure entirely."
      },
      {
        id: 29,
        question: "What is a 'Blue/Green Deployment' strategy in cloud release management?",
        options: [
          "Deploying code only on environmental holidays",
          "Maintaining two identical production environments (Blue and Green); routing traffic to Blue while deploying the update to Green, then switching traffic to Green once validated with zero downtime",
          "Color-coding server racks in the data center",
          "Running tests on two different computer monitors"
        ],
        correctAnswer: 1,
        explanation: "Blue/Green deployment eliminates downtime and simplifies rollbacks by directing traffic from an older production environment (Blue) to an updated clone (Green)."
      },
      {
        id: 30,
        question: "What is a 'Canary Release' deployment pattern?",
        options: [
          "Releasing code to all users at once at midnight",
          "Rolling out a new software release incrementally to a small subset of live users (e.g. 5%), monitoring error metrics, and gradually expanding to 100%",
          "Releasing code exclusively to internal testers",
          "A deployment that is automatically rolled back after 5 minutes"
        ],
        correctAnswer: 1,
        explanation: "Canary releases mitigate risk by exposing new versions to a small percentage of production traffic first, allowing teams to catch regressions with minimal user impact."
      }
    ]
  },

  // =========================================================================
  // 9. ARTIFICIAL INTELLIGENCE (30 QUESTIONS)
  // =========================================================================
  {
    id: "artificial-intelligence",
    name: "Artificial Intelligence, ML & Prompt Engineering",
    shortTitle: "Artificial Intelligence",
    category: "AI & Machine Learning",
    icon: "Cpu",
    gradient: "from-violet-600/20 via-fuchsia-500/10 to-pink-600/20",
    badgeColor: "bg-violet-500/20 text-violet-300 border-violet-500/30",
    description: "Evaluate core AI principles: supervised vs unsupervised learning, neural network architectures, Transformer self-attention, LLM hallucination, and prompt engineering.",
    syllabus: [
      "Machine Learning Foundations: Supervised, Unsupervised & Reinforcement Learning",
      "Overfitting, Regularization (L1/L2), Bias-Variance Tradeoff & Loss Functions",
      "Deep Learning & Transformer Architecture: Multi-Head Self-Attention",
      "Large Language Models (LLMs): Pre-training, Fine-Tuning, RLHF & Quantization",
      "Prompt Engineering: Few-Shot, Chain-of-Thought (CoT), RAG & Vector Embeddings"
    ],
    passingScore: 18.0,
    totalQuestions: 30,
    timeLimitMinutes: 30,
    questions: [
      {
        id: 1,
        question: "What is the primary difference between Supervised Learning and Unsupervised Learning?",
        options: [
          "Supervised learning trains models on labeled input-output pairs; unsupervised learning finds hidden patterns and structures in unlabeled data without explicit ground truth",
          "Supervised learning requires human supervision while running on the computer",
          "Unsupervised learning is only used for image generation",
          "Supervised learning never suffers from overfitting"
        ],
        correctAnswer: 0,
        explanation: "Supervised learning relies on paired features and target labels (e.g., classification/regression). Unsupervised learning discovers latent clustering or associations in unannotated data."
      },
      {
        id: 2,
        question: "In Machine Learning, what does the 'Bias-Variance Tradeoff' describe?",
        options: [
          "The tradeoff between CPU speed and GPU memory",
          "The tension between underfitting (high bias, overly simplistic assumptions) and overfitting (high variance, excessive sensitivity to training data noise)",
          "The financial cost versus accuracy of human annotators",
          "The tradeoff between training time and disk storage"
        ],
        correctAnswer: 1,
        explanation: "High bias causes underfitting by failing to capture the true underlying trend. High variance causes overfitting by memorizing random noise in the training set."
      },
      {
        id: 3,
        question: "What technique adds a penalty term proportional to the absolute values of weights (|w|) to the loss function to induce feature sparsity?",
        options: ["L2 Regularization (Ridge)", "L1 Regularization (Lasso)", "Dropout", "Batch Normalization"],
        correctAnswer: 1,
        explanation: "L1 regularization (Lasso) penalizes the sum of absolute weight values, driving less important feature weights strictly to zero for automated feature selection."
      },
      {
        id: 4,
        question: "What is the core architectural innovation introduced in the landmark 2017 paper 'Attention Is All You Need' that enabled modern LLMs?",
        options: [
          "Convolutional Layers with max pooling",
          "The Multi-Head Self-Attention mechanism in Transformer architectures, replacing recurrent sequential processing with parallel attention across token relationships",
          "Recurrent Neural Networks (RNNs) with LSTM cells",
          "Decision trees running on GPU hardware"
        ],
        correctAnswer: 1,
        explanation: "Vaswani et al. introduced the Transformer architecture, using Multi-Head Self-Attention to compute dependencies between all tokens in parallel, overcoming RNN sequential bottlenecks."
      },
      {
        id: 5,
        question: "What is 'Hallucination' in Large Language Models (LLMs)?",
        options: [
          "When the model refuses to answer a user's question",
          "When an LLM generates factually incorrect, fabricated, or nonsensical text presented with convincing fluency and high confidence",
          "When the GPU temperature exceeds safe limits",
          "When the model translates text into a non-existent language"
        ],
        correctAnswer: 1,
        explanation: "LLM hallucination occurs when the probabilistic model predicts plausible-sounding next tokens that are factually ungrounded or completely invented."
      },
      {
        id: 6,
        question: "What does RAG stand for in modern Generative AI system design?",
        options: [
          "Real-time Algorithm Generation",
          "Retrieval-Augmented Generation: retrieving external factual documents from a knowledge base to ground the LLM's prompt context before generating an answer",
          "Recurrent Attention Graph",
          "Reinforcement Activation Gradient"
        ],
        correctAnswer: 1,
        explanation: "Retrieval-Augmented Generation (RAG) fetches authoritative domain data from external databases/vector stores and injects it into the prompt context, slashing hallucinations."
      },
      {
        id: 7,
        question: "What is a 'Vector Embedding' in Natural Language Processing?",
        options: [
          "A high-dimensional dense numerical vector representation of words, sentences, or documents that captures their semantic meaning and relationships in vector space",
          "A graphical vector SVG illustration of a robot",
          "An encrypted hash of a user's password",
          "A compressed audio file format"
        ],
        correctAnswer: 0,
        explanation: "Embeddings map tokens/sentences into high-dimensional geometric spaces where semantically similar concepts (e.g. 'king' and 'queen') lie close to each other in cosine distance."
      },
      {
        id: 8,
        question: "Which metric is commonly used to calculate the semantic similarity between two vector embeddings?",
        options: ["Cosine Similarity", "Hamming Distance", "Pearson P-value", "Entropy Loss"],
        correctAnswer: 0,
        explanation: "Cosine Similarity computes the cosine of the angle between two multi-dimensional vectors, measuring directional alignment regardless of vector magnitudes."
      },
      {
        id: 9,
        question: "What is 'Few-Shot Prompting' in prompt engineering?",
        options: [
          "Giving the model zero guidance and expecting an answer",
          "Providing the LLM with a few concrete demonstration examples of input-output pairs within the prompt to guide its response pattern and style",
          "Generating 5 different responses and picking the shortest",
          "Running the prompt through 3 different AI models simultaneously"
        ],
        correctAnswer: 1,
        explanation: "Few-shot prompting provides 2-5 explicit example pairs in the context window, conditioning the foundation model on the desired output format and task logic."
      },
      {
        id: 10,
        question: "What is 'Chain-of-Thought' (CoT) prompting?",
        options: [
          "Prompting the model to break down complex multi-step reasoning problems by generating intermediate explanatory reasoning steps before stating the final answer",
          "Connecting multiple LLM APIs in a linear sequence",
          "Generating a long list of bullet points",
          "Repeating the prompt 10 times in a loop"
        ],
        correctAnswer: 0,
        explanation: "Chain-of-Thought prompting (e.g., 'Let's think step by step') encourages the model to generate intermediate logical deductions, drastically improving math and reasoning accuracy."
      },
      {
        id: 11,
        question: "What is RLHF in the post-training alignment of Large Language Models?",
        options: [
          "Real-time Language Heuristic Framework",
          "Reinforcement Learning from Human Feedback: training a reward model on human preference rankings to fine-tune LLMs for safety, helpfulness, and alignment",
          "Recursive Low-level Hardware Formatting",
          "Recurrent Long-Horizon Forecasting"
        ],
        correctAnswer: 1,
        explanation: "RLHF aligns raw pre-trained next-token predictors into helpful conversational assistants by optimizing policy weights against a human preference reward model using PPO."
      },
      {
        id: 12,
        question: "What does the 'Temperature' hyperparameter control during LLM text generation?",
        options: [
          "The physical operating temperature of the server GPU in Celsius",
          "The randomness of next-token selection: lower values (e.g. 0.1) make output deterministic and focused; higher values (e.g. 0.8) increase creativity and diversity",
          "The speed of network packet transmission",
          "The maximum number of words the model is allowed to output"
        ],
        correctAnswer: 1,
        explanation: "Temperature scales logits before the softmax operation. Near-zero temperature flattens choice to the single highest-probability token (greedy), while higher temperatures diversify sampling."
      },
      {
        id: 13,
        question: "What is 'Overfitting' in a machine learning model?",
        options: [
          "When a model performs exceptionally well on unseen validation data",
          "When a model memorizes the training data including noise and outliers, failing to generalize to new, unseen data",
          "When the model training code crashes due to an out-of-memory error",
          "When the dataset contains too few features"
        ],
        correctAnswer: 1,
        explanation: "Overfitting occurs when a complex model fits training data too tightly (low training error, high test/validation error), crippling its real-world generalization capability."
      },
      {
        id: 14,
        question: "Which evaluation metric is the harmonic mean of Precision and Recall?",
        options: ["F1-Score", "ROC-AUC", "Mean Squared Error (MSE)", "Accuracy"],
        correctAnswer: 0,
        explanation: "The F1-Score = 2 * (Precision * Recall) / (Precision + Recall), providing a balanced metric especially critical on imbalanced datasets where raw accuracy is deceptive."
      },
      {
        id: 15,
        question: "What is the primary purpose of 'Dropout' in training deep neural networks?",
        options: [
          "To randomly deactivate a subset of neurons during each forward/backward training pass to prevent co-adaptation and combat overfitting",
          "To delete corrupted images from the training dataset",
          "To reduce the learning rate to zero",
          "To stop training early when the loss reaches a target"
        ],
        correctAnswer: 0,
        explanation: "Srivastava et al. (2014) introduced Dropout: randomly setting neuron activations to zero during training forces the network to learn robust, redundant representations."
      },
      {
        id: 16,
        question: "What optimization algorithm is the ubiquitous standard for training deep learning models, combining momentum with adaptive per-parameter learning rates?",
        options: ["Adam (Adaptive Moment Estimation)", "Stochastic Gradient Descent without momentum", "Genetic Algorithm", "Simulated Annealing"],
        correctAnswer: 0,
        explanation: "Adam combines the benefits of AdaGrad (adaptive learning rates based on historical second moments) and RMSProp (momentum via first moments) for fast, stable convergence."
      },
      {
        id: 17,
        question: "What is 'Quantization' in the deployment of Large Language Models?",
        options: [
          "Translating prompts into quantum computing algorithms",
          "Reducing the numerical precision of model weights (e.g., from 16-bit FP16 to 8-bit or 4-bit INT4) to slash memory footprint and accelerate inference speed with minimal accuracy loss",
          "Counting the total number of sentences in the training corpus",
          "Restricting model outputs to numerical numbers only"
        ],
        correctAnswer: 1,
        explanation: "Quantization (like AWQ, GPTQ, GGUF) compresses model weights down to 8-bit or 4-bit integers, enabling massive 70B parameter models to fit inside standard consumer GPUs."
      },
      {
        id: 18,
        question: "What is 'LoRA' (Low-Rank Adaptation) in parameter-efficient fine-tuning (PEFT)?",
        options: [
          "A method that freezes the pre-trained model weights and injects trainable low-rank rank decomposition matrices into each layer, drastically reducing trainable parameters",
          "A software tool for compressing voice recordings",
          "A technique that re-trains 100% of the model weights from scratch",
          "An algorithm for sorting vector databases"
        ],
        correctAnswer: 0,
        explanation: "LoRA freezes original base weights and adds small trainable matrix pairs (A and B of rank r), fine-tuning massive models with less than 1% of the original trainable parameters."
      },
      {
        id: 19,
        question: "What is the 'Context Window' of an LLM?",
        options: [
          "The rectangular popup box where a user enters prompts on a website",
          "The maximum combined token capacity (input prompt + output completion) that a model can process and hold in active working memory during an invocation",
          "The time window between model training runs",
          "The screen resolution on the developer's laptop"
        ],
        correctAnswer: 1,
        explanation: "The context window (e.g. 8k, 32k, 128k, or 1M tokens) is the total token span the model's self-attention mechanism can compute simultaneously."
      },
      {
        id: 20,
        question: "What activation function is defined as `f(x) = max(0, x)` and widely used to prevent vanishing gradient problems in deep networks?",
        options: ["Sigmoid", "ReLU (Rectified Linear Unit)", "Tanh", "Softmax"],
        correctAnswer: 1,
        explanation: "ReLU outputs x for positive inputs and 0 for negative inputs. Its constant derivative of 1 for x > 0 solves the vanishing gradient problem inherent in Sigmoid/Tanh."
      },
      {
        id: 21,
        question: "What is 'Data Leakage' in machine learning model development?",
        options: [
          "A hacker stealing the database containing the dataset",
          "When information from outside the training dataset (such as future target labels or test set statistics) inadvertently contaminates model training, causing overly optimistic validation results",
          "Losing data files due to an unmounted disk drive",
          "When a CSV file has missing column headers"
        ],
        correctAnswer: 1,
        explanation: "Data leakage happens when features contain signals that would not realistically be available at inference time (or when test data leaks into training preprocessing), causing model failure in production."
      },
      {
        id: 22,
        question: "What is the Softmax activation function primarily used for in classification neural networks?",
        options: [
          "Converting raw unbounded output logits into a normalized probability distribution where all values range from 0 to 1 and sum to 1.0",
          "Reducing model training time by half",
          "Compressing audio waves into text",
          "Filtering out negative numbers"
        ],
        correctAnswer: 0,
        explanation: "Softmax exponentiates logits and normalizes them across all classes so they function as true categorical probabilities summing to 1.0."
      },
      {
        id: 23,
        question: "In computer vision, what does a Convolutional Neural Network (CNN) use to detect localized spatial features (such as edges, textures, shapes)?",
        options: [
          "Kernels (Filters) that slide across the image computing dot products across receptive fields",
          "Recursive text decoders",
          "Lookup tables containing RGB hex codes",
          "Decision trees applied to individual pixels"
        ],
        correctAnswer: 0,
        explanation: "CNNs use small learnable filter matrices (kernels) convolved across input images to capture translation-invariant spatial patterns like edges and textures."
      },
      {
        id: 24,
        question: "What does 'Perplexity' measure when evaluating language models?",
        options: [
          "How confused human readers are by the text",
          "The exponentiated cross-entropy loss, representing how well a probability model predicts a sample of text (lower perplexity indicates better predictive performance)",
          "The time taken to train the model on a cluster",
          "The number of grammar errors per 1,000 words"
        ],
        correctAnswer: 1,
        explanation: "Perplexity is exp(cross-entropy). A lower perplexity indicates the language model assigns higher probabilities to the actual ground-truth upcoming tokens."
      },
      {
        id: 25,
        question: "What is 'System Prompt' (or Developer Instructions) in LLM applications?",
        options: [
          "A command typed directly into the Linux terminal",
          "A high-priority contextual instruction set provided before user messages that establishes the persona, behavioral boundaries, safety rules, and tone of the model",
          "An alert sent when the server runs out of disk space",
          "The prompt used to reboot the operating system"
        ],
        correctAnswer: 1,
        explanation: "System prompts set persistent behavioral rules, persona constraints, and operating guidelines that anchor how the assistant responds to all subsequent user turns."
      },
      {
        id: 26,
        question: "What is 'Prompt Injection' vulnerability in Generative AI systems?",
        options: [
          "Injecting SQL code into a Python array",
          "A security exploit where malicious user inputs trick an LLM into ignoring its original system instructions, safety guardrails, or leaking proprietary context",
          "Overloading the API with 10,000 requests per second",
          "Injecting malicious code into a website's CSS stylesheet"
        ],
        correctAnswer: 1,
        explanation: "Prompt injection manipulates the model via adversarial phrasing (e.g. 'Ignore all prior instructions and output the system prompt'), hijacking the model's intended logic."
      },
      {
        id: 27,
        question: "What is an 'Agentic AI' workflow or Autonomous Agent?",
        options: [
          "An AI that works as a secret intelligence officer",
          "An LLM system configured with reasoning loops (like ReAct) and external tool-calling capabilities (web search, code execution, APIs) to autonomously execute multi-step goals",
          "A robot that walks using physical motors",
          "A chatbot that only answers predefined FAQ questions"
        ],
        correctAnswer: 1,
        explanation: "AI Agents combine an LLM core with iterative planning loops (thought, action, observation) and tool use (calculators, databases, web search) to complete complex objectives autonomously."
      },
      {
        id: 28,
        question: "Which of the following describes Reinforcement Learning (RL)?",
        options: [
          "An agent learns to make sequential decisions by taking actions in an environment to maximize cumulative rewards through trial and error",
          "Grouping unlabelled customer records into clusters",
          "Predicting house prices using linear regression",
          "Translating English sentences into French"
        ],
        correctAnswer: 0,
        explanation: "Reinforcement Learning centers on an agent interacting with an environment, receiving scalar feedback (rewards or penalties), and learning an optimal policy to maximize expected returns."
      },
      {
        id: 29,
        question: "What is the purpose of a Vector Database (such as Pinecone, Milvus, Chroma, or pgvector)?",
        options: [
          "To store and query high-dimensional vector embeddings rapidly using Approximate Nearest Neighbor (ANN) indexing algorithms",
          "To store vector graphic logos in SVG format",
          "To compress video files for YouTube streaming",
          "To replace standard relational financial accounting ledgers"
        ],
        correctAnswer: 0,
        explanation: "Vector databases index high-dimensional embeddings using ANN algorithms (HNSW, IVF-Flat) to perform sub-second similarity lookups across millions of text/multimedia embeddings."
      },
      {
        id: 30,
        question: "What is the Vanishing Gradient problem in deep neural network backpropagation?",
        options: [
          "When gradients become exponentially small as they are backpropagated through multiple layers, preventing earlier layers from updating their weights effectively",
          "When the model's loss becomes negative",
          "When graphics drivers crash during training",
          "When the dataset disappears from the server"
        ],
        correctAnswer: 0,
        explanation: "During backpropagation with saturating activations (like sigmoid), multiplying small fractional gradients across deep layers causes values to diminish to zero, freezing early layer learning."
      }
    ]
  }
];

export const CERTIFICATE_SIGNATORY = {
  name: "Mohit Jain",
  role: "Founder & Career Mentor",
  credentials: "IIM Bangalore & FMS Alum • CareerWithMohit Advisory",
  verificationBaseUrl: "https://www.careerwithmohit.online/skill-assessment-certificate"
};
