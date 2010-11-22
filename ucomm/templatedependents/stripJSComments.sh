#! /bin/bash

for filename in "$@";
  do
# Removes comments.
#  perl -0777 -p -e 's/(\/\*).*?(\*\/)//gs' $filename
#  perl -p -e 's/(\/\/).*?^//gs' $filename
  
# Strips whitespace from the start of each line.
#  perl -p -e 's/^\s*//g' $filename
  
# Remove linebreaks after `;' that end lines.
#  perl -p -e 's/;\s{1,}$/;/mg' $filename

# Remove linebreaks after `{' or `}' that end lines.
#  perl -p -e 's/\{\s{1,}$/{/mg' $filename
#  perl -p -e 's/\}\s{1,}$/}/mg' $filename


# Do everything at once so things work out.
perl -0777 -p -e 's/(\/\*).*?(\*\/)//gs' $filename |  \
perl -p -e 's/(\/\/).*?$//gs' | \
perl -p -e 's/^\s*//g' | \
perl -p -e 's/;\s{1,}$/;/mg' | \
perl -p -e 's/\{\s{1,}$/{/mg' | \
perl -p -e 's/\}\s{1,}$/}/mg'

done


